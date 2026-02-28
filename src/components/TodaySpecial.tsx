import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const TodaySpecial = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border"
      style={{
        background: 'hsl(42 60% 57% / 0.08)',
        borderColor: 'hsl(42 60% 57% / 0.25)',
      }}
    >
      <motion.div
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Sparkles className="w-4 h-4 text-primary" />
      </motion.div>
      <span className="text-sm font-medium text-primary tracking-wide">Today's Special</span>
    </motion.div>
  );
};

export default TodaySpecial;
