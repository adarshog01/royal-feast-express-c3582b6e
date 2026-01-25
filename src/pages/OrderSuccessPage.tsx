import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, PartyPopper, Home } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import confetti from "canvas-confetti";

const OrderSuccessPage = () => {
  useEffect(() => {
    // Celebration confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#D4A574", "#8B4513", "#FFD700"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#D4A574", "#8B4513", "#FFD700"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-md"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-14 h-14 text-green-600" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-4"
          >
            Order Confirmed!
          </motion.h1>

          {/* Party Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-6"
          >
            <PartyPopper className="w-12 h-12 text-primary animate-bounce" />
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg mb-8"
          >
            Your delicious food is on the way! 🛵
            <br />
            <span className="text-sm">
              We'll deliver it fresh and hot to your doorstep in Sonipat.
            </span>
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6 }}
            className="divider-royal mb-8"
          />

          {/* Thank You */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-serif text-2xl text-primary mb-8"
          >
            Thank you for choosing Kovish!
          </motion.p>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/">
              <motion.button
                className="btn-gold flex items-center justify-center gap-3 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default OrderSuccessPage;
