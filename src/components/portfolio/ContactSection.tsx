import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-heading text-sm tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Let's{" "}
            <span className="text-gradient">connect</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind or just want to chat? Feel free to reach
              out. I'm always open to new opportunities and collaborations.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm">alex@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm"
              />
            </div>
            <textarea
              placeholder="Your Message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <Send size={16} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
