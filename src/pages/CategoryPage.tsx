import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getCategoryBySlug, getMenuItemsByCategory, categories } from "@/data/menuData";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const validSlugs = ["momos", "kathi-rolls", "burgers", "cold-coffee"];

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Check if this is a valid category slug
  if (!slug || !validSlugs.includes(slug)) {
    return <Navigate to="/" replace />;
  }

  const category = getCategoryBySlug(slug);
  const products = getMenuItemsByCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-xl text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Header Section */}
        <section className="bg-background py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-2">
                Our Menu
              </h1>
              <div className="divider-royal mb-4" />
              <p className="text-muted-foreground">
                Choose from our delicious categories
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Header */}
        <section className="py-8 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-2xl md:text-3xl font-bold text-secondary flex items-center gap-3"
              >
                <span className="text-3xl">{category.icon}</span>
                {category.name}
              </motion.h2>

              <Link to="/#menu">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Categories</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No items available in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
