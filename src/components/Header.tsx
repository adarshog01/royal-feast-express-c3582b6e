import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    totalItems,
    openCart,
    cartBounce
  } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6,
    ease: "easeOut"
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || !isHome ? "bg-background/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group">
          <motion.h1 className={`font-serif text-2xl md:text-3xl font-bold transition-colors duration-300 ${isScrolled || !isHome ? "text-secondary" : "text-secondary"}`} whileHover={{
          scale: 1.02
        }}>
            <span className="text-gradient-gold text-white text-4xl font-serif">Kovish</span>
          </motion.h1>
        </Link>

        {/* Cart Button */}
        <motion.button onClick={openCart} className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${isScrolled || !isHome ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} animate={cartBounce ? {
        scale: [1, 1.2, 1]
      } : {}}>
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
          <AnimatePresence>
            {totalItems > 0 && <motion.span initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} exit={{
            scale: 0
          }} className="absolute -top-2 -right-2 min-w-5 h-5 px-1.5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </motion.span>}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.header>;
};
export default Header;