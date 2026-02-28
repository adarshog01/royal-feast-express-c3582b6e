import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Ornamental Divider */}
      <div className="h-px" style={{ background: 'var(--gradient-gold-metallic)' }} />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-3xl font-bold text-primary mb-3">Kovish</h3>
            <p className="text-secondary-foreground/70 italic font-display text-lg">
              Taste the Royal Street Flavours
            </p>
            <div className="mt-5 h-px w-16" style={{ background: 'var(--gradient-gold)' }} />
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-serif text-xl font-semibold text-primary mb-5">Contact</h4>
            <div className="space-y-4">
              <a href="tel:+918353964663" className="flex items-center gap-3 hover:text-primary transition-colors duration-300">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 83539 64663</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-secondary-foreground/80">Sector 14, Sonipat,<br />Haryana, India</span>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-serif text-xl font-semibold text-primary mb-5">Hours</h4>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p>Monday – Sunday</p>
                <p className="text-secondary-foreground/60">11:00 AM – 11:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 pt-6 border-t border-secondary-foreground/15 text-center text-xs text-secondary-foreground/40 tracking-wide">
          <p>© {new Date().getFullYear()} Kovish. All rights reserved. Delivering exclusively in Sonipat, Haryana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
