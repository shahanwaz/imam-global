import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import StepProgress from "../components/donate/StepProgress";
import Step1DonationType from "../components/donate/Step1DonationType";
import Step2Amount from "../components/donate/Step2Amount";
import Step3Details from "../components/donate/Step3Details";
import Step4OTP from "../components/donate/Step4OTP";
import Step5Summary from "../components/donate/Step5Summary";
import Step6Payment from "../components/donate/Step6Payment";
import Step7Result from "../components/donate/Step7Result";
import Step8Invoice from "../components/donate/Step8Invoice";

const INITIAL_DATA = {
  donationType: "",
  amount: null,
  customAmount: "",
  currency: "USD",
  name: "",
  email: "",
  mobile: "",
  address: "",
  country: "",
};

export default function Donate() {
  const { t } = useOutletContext();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [transactionId, setTransactionId] = useState(null);
  const [paymentFailed, setPaymentFailed] = useState(false);

  // Auto-detect country and currency
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((info) => {
        const countryName = info.country_name || "Unknown";
        const currency = info.currency || "USD";
        setData((prev) => ({ ...prev, country: countryName, currency }));
      })
      .catch(() => {});
  }, []);

  const update = (patch) => setData((prev) => ({ ...prev, ...patch }));
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handlePaymentSuccess = async (txnId) => {
    setTransactionId(txnId);
    // Save transaction to database
    try {
      await base44.entities.DonationTransaction.create({
        transaction_id: txnId,
        donor_name: data.name,
        donor_email: data.email,
        donor_mobile: data.mobile,
        donor_country: data.country,
        donation_type: data.donationType,
        amount: Number(data.customAmount || data.amount),
        currency: data.currency,
        status: "success",
      });
    } catch (_) {}
    setStep(7);
  };

  const handlePaymentFailure = () => {
    setPaymentFailed(true);
    setStep(7);
  };

  const handleRetry = () => {
    setPaymentFailed(false);
    setStep(6);
  };

  const handleViewInvoice = () => setStep(8);

  // Steps 7 and 8 get full-width treatment (no step bar)
  const showProgress = step <= 6;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="bg-primary/5 islamic-pattern py-10 px-4 text-center border-b border-border">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          {t.donate.heroBadge}
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          {t.donate.heroHeading}
        </h1>
      </div>

      {/* Wizard card */}
      <div className="max-w-xl mx-auto px-4 py-10">
        {showProgress && <StepProgress currentStep={step} />}

        <div className="bg-card rounded-2xl shadow-xl border border-border p-6 sm:p-8 min-h-[420px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <Step1DonationType key="s1" data={data} onUpdate={update} onNext={next} />
            )}
            {step === 2 && (
              <Step2Amount key="s2" data={data} onUpdate={update} onNext={next} onBack={back} />
            )}
            {step === 3 && (
              <Step3Details key="s3" data={data} onUpdate={update} onNext={next} onBack={back} />
            )}
            {step === 4 && (
              <Step4OTP key="s4" data={data} onNext={next} onBack={back} />
            )}
            {step === 5 && (
              <Step5Summary key="s5" data={data} onNext={next} onBack={back} onEdit={(s) => setStep(s)} />
            )}
            {step === 6 && (
              <Step6Payment key="s6" data={data} onSuccess={handlePaymentSuccess} onFailure={handlePaymentFailure} onBack={back} />
            )}
            {step === 7 && (
              <Step7Result key="s7" data={data} transactionId={paymentFailed ? null : transactionId} onRetry={handleRetry} onViewInvoice={handleViewInvoice} />
            )}
            {step === 8 && (
              <Step8Invoice key="s8" data={data} transactionId={transactionId} />
            )}
          </AnimatePresence>
        </div>

        {showProgress && (
          <p className="text-center text-xs text-muted-foreground mt-5 flex items-center justify-center gap-1.5">
            <span>🔒</span> Secure & Encrypted — Step {step} of 6
          </p>
        )}
      </div>
    </div>
  );
}