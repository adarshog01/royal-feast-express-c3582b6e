import { motion } from "framer-motion";
import { categories } from "@/data/menuData";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import TodaySpecial from "@/components/TodaySpecial";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Hero />

        {/* Today's Special */}
        <section className="py-8 bg-background text-center">
          <TodaySpecial />
        </section>

        {/* Menu Categories */}
        <section id="menu" className="section-luxury bg-background grain-texture">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <p className="text-primary font-sans text-xs tracking-royal uppercase mb-4">Explore</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-5">
                Our Menu
              </h2>
              <div className="divider-royal mb-5" />
              <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                Curated royal street food, crafted with passion
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
              {categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="section-luxury bg-card grain-texture">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-primary font-sans text-xs tracking-royal uppercase mb-4">Our Story</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-5">
                  A Legacy of Royal Taste
                </h2>
                <div className="h-px w-20 mb-6" style={{ background: 'var(--gradient-gold)' }} />
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Born in the heart of Sonipat, Kovish brings the royal flavours of Indian street food to your doorstep. Every dish is a celebration of tradition, crafted with premium ingredients and served with love.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From our signature Kathi Rolls to our soul-warming Momos, each bite tells a story of culinary excellence passed through generations.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden" style={{ boxShadow: 'var(--shadow-luxury)' }}>
                  <img
                    src={categories[1]?.image}
                    alt="Kovish Food"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative gold corner */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 rounded-tr-3xl" style={{ borderColor: 'hsl(42 60% 57% / 0.4)' }} />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 rounded-bl-3xl" style={{ borderColor: 'hsl(42 60% 57% / 0.4)' }} />
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
