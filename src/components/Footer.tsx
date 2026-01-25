import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Ornamental Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-3xl font-bold text-primary mb-3">Kovish</h3>
            <p className="text-secondary-foreground/80 italic font-serif">
              Taste the Royal Street Flavours
            </p>
            <div className="mt-4 h-px w-16 bg-primary/50" />
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-serif text-xl font-semibold text-primary mb-4">Contact</h4>
            <div className="space-y-3">
              <a 
                href="tel:+919999999999"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 99999 99999</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span>Sector 14, Sonipat,<br />Haryana, India</span>
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
            <h4 className="font-serif text-xl font-semibold text-primary mb-4">Hours</h4>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p>Monday - Sunday</p>
                <p className="text-secondary-foreground/80">11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-secondary-foreground/20 text-center text-sm text-secondary-foreground/60">
          <p>© 2025 Kovish. All rights reserved. Delivering only in Sonipat, Haryana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
