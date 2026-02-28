import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getCategoryBySlug, getMenuItemsByCategory } from "@/data/menuData";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const validSlugs = ["momos", "kathi-rolls", "burgers", "cold-coffee"];

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !validSlugs.includes(slug)) {
    return <Navigate to="/" replace />;
  }

  const category = getCategoryBySlug(slug);
  const products = getMenuItemsByCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-xl text-muted-foreground font-serif">Category not found</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Category Hero */}
        <section className="relative py-16 bg-card grain-texture overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ background: 'var(--gradient-gold-radial)' }} />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <span className="text-5xl mb-4 block">{category.icon}</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-3">
                {category.name}
              </h1>
              <div className="divider-royal mb-4" />
              <p className="text-muted-foreground">
                {products.length} royal delicacies
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <Link to="/#menu">
                <button className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-full hover:bg-muted transition-colors text-sm">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Categories
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-luxury bg-background grain-texture">
          <div className="container mx-auto px-4 relative z-10">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg font-serif">No items available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default CategoryPage;
