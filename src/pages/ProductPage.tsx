import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { getMenuItemById } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getMenuItemById(id || "");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground font-serif">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4 py-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="aspect-square overflow-hidden rounded-3xl"
                style={{ boxShadow: 'var(--shadow-luxury)' }}
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4"
                >
                  {product.name}
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4 }}
                  className="h-px w-20 mb-6 origin-left"
                  style={{ background: 'var(--gradient-gold)' }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground text-lg mb-8 leading-relaxed"
                >
                  {product.description}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="font-serif text-4xl font-bold text-primary mb-10"
                >
                  ₹{product.price}
                </motion.p>

                {/* Quantity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-6 mb-10"
                >
                  <span className="text-muted-foreground font-medium">Quantity</span>
                  <div className="flex items-center gap-4 bg-card rounded-full px-5 py-3 border border-border/50">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center bg-muted rounded-full hover:bg-muted-foreground/20 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-muted rounded-full hover:bg-muted-foreground/20 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>

                {/* Add to Cart */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={handleAddToCart}
                  className={`btn-gold flex items-center justify-center gap-3 text-lg transition-all duration-300 ${
                    added ? "!bg-green-600" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={added ? { background: '#16a34a', boxShadow: '0 4px 20px rgba(22,163,74,0.3)' } : {}}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </motion.button>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-center text-muted-foreground mt-4"
                >
                  Total: <span className="text-primary font-semibold">₹{product.price * quantity}</span>
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ProductPage;
