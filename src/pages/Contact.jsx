import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const { t } = useOutletContext();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <section className="bg-primary/5 islamic-pattern py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              {t.contact.badge}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{t.contact.heading}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.contact.subtext}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{t.contact.getInTouch}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{t.contact.getInTouchText}</p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="font-semibold text-foreground">{t.contact.emailLabel}</p>
                    <p className="text-muted-foreground text-sm">info.zahoorfoundation@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="font-semibold text-foreground">{t.contact.phoneLabel}</p>
                    <p className="text-muted-foreground text-sm">+98 9457031317</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="font-semibold text-foreground">{t.contact.addressLabel}</p>
                    <p className="text-muted-foreground text-sm">Qom، انتهای، بلوار پيامبر اعظم،<br />HWM7+6FR, Iran</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 bg-accent/10 border border-accent/20 rounded-xl">
                <p className="font-heading italic text-accent-foreground">"Serving Humanity in the Light of Imam (A.S.)"</p>
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-2xl p-10 border border-border shadow-sm text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{t.contact.successTitle}</h3>
                  <p className="text-muted-foreground">{t.contact.successText}</p>
                </motion.div>
              ) : (
                <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-sm">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6">{t.contact.formTitle}</h3>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t.contact.nameLabel}</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder={t.contact.namePlaceholder}
                        className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t.contact.emailInputLabel}</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t.contact.emailPlaceholder}
                        className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-foreground mb-2">{t.contact.subjectLabel}</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder={t.contact.subjectPlaceholder}
                      className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">{t.contact.messageLabel}</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    {t.contact.sendCta}
                  </button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}