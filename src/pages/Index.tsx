import { motion } from "framer-motion";
import { categories } from "@/data/menuData";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Menu Categories Section */}
        <section id="menu" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-4">
                Our Menu
              </h2>
              <div className="divider-royal mb-4" />
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Choose from our delicious categories
              </p>
            </motion.div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
