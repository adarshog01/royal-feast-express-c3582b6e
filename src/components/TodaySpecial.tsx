import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const TodaySpecial = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full"
    >
      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
      <span className="text-sm font-medium text-primary">Today's Special</span>
    </motion.div>
  );
};

export default TodaySpecial;
