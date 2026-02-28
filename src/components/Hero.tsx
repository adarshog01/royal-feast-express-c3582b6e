import { motion, useScroll, useTransform } from "framer-motion";
import royalPattern from "@/assets/royal-pattern.jpg";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.05]);

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background with zoom */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${royalPattern})` }}
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, hsl(18 55% 6% / 0.5) 100%)' }} />
        {/* Gold radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(42 70% 55% / 0.08), transparent 60%)' }} />

        {/* Golden Dust Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                background: `hsl(42 ${60 + Math.random() * 20}% ${55 + Math.random() * 20}% / ${0.3 + Math.random() * 0.4})`,
              }}
              animate={{
                y: [0, -(60 + Math.random() * 80), 0],
                x: [0, (Math.random() - 0.5) * 40, 0],
                opacity: [0.1, 0.7, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Welcome */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-sm tracking-royal uppercase mb-8"
          style={{ color: 'hsl(42 65% 72%)' }}
        >
          Welcome to
        </motion.p>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-gradient-gold"
          style={{ textShadow: "0 4px 30px hsl(42 60% 50% / 0.3)" }}
        >
          Kovish
        </motion.h1>

        {/* Ornamental Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
          <div className="w-2 h-2 rotate-45 bg-primary/70" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
        </motion.div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-display text-2xl md:text-4xl lg:text-5xl italic mb-5"
          style={{ color: 'hsl(38 50% 94%)', textShadow: "0 2px 15px rgba(0,0,0,0.4)" }}
        >
          Taste the Royal Street Flavours
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-xl font-sans mb-12 tracking-wide"
          style={{ color: 'hsl(38 40% 85%)' }}
        >
          Fresh. Hot. Delivered in Sonipat.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          onClick={scrollToMenu}
          className="btn-gold btn-gold-auto text-base md:text-lg px-12 py-5 animate-pulse-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Order Now
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
          style={{ borderColor: 'hsl(42 60% 57% / 0.4)' }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ background: 'hsl(42 60% 57% / 0.6)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
