import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Mail, RefreshCw } from "lucide-react";

export default function Step4OTP({ data, onNext, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendCooldown]);

  const sendOTP = async () => {
    setSending(true);
    setError("");
    try {
      await base44.functions.invoke("sendDonationOTP", { email: data.email, name: data.name });
      setSent(true);
      setResendCooldown(60);
    } catch {
      setError("Failed to send OTP. Please try again.");
    }
    setSending(false);
  };

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setError("");
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(""));
      refs.current[5]?.focus();
    }
  };

  const verify = async () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter all 6 digits"); return; }
    setVerifying(true);
    setError("");
    try {
      const res = await base44.functions.invoke("verifyDonationOTP", { email: data.email, otp: code });
      if (res.data?.verified) {
        onNext();
      } else {
        setError("Invalid or expired OTP. Please try again.");
      }
    } catch {
      setError("Verification failed. Please try again.");
    }
    setVerifying(false);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Verify Your Email</h2>
      <p className="text-muted-foreground mb-6">
        We'll send a 6-digit code to <span className="font-semibold text-foreground">{data.email}</span>
      </p>

      {!sent ? (
        <div className="text-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <p className="text-muted-foreground mb-6">Click below to receive your OTP via email.</p>
          <button
            onClick={sendOTP}
            disabled={sending}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send OTP"}
          </button>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      ) : (
        <div>
          <p className="text-sm text-green-600 font-medium mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            OTP sent to {data.email}
          </p>

          <div className="flex gap-2 sm:gap-3 justify-center mb-4" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (refs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all ${
                  digit ? "border-primary bg-primary/5" : "border-border focus:border-primary"
                }`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <button
            onClick={resendCooldown > 0 ? null : sendOTP}
            disabled={resendCooldown > 0 || sending}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mx-auto mb-6 disabled:opacity-40"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
          </button>

          <button
            onClick={verify}
            disabled={verifying || otp.join("").length < 6}
            className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-40"
          >
            {verifying ? "Verifying..." : "Verify & Continue →"}
          </button>
        </div>
      )}

      <div className="mt-4">
        <button onClick={onBack} className="w-full py-3 border-2 border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition-all text-sm">
          ← Back
        </button>
      </div>
    </motion.div>
  );
}