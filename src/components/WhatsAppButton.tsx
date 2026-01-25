import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open("https://wa.me/919999999999?text=Hi! I would like to place an order.", "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      className="whatsapp-btn"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.button>
  );
};

export default WhatsAppButton;
