import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: MenuItem;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link to={`/product/${product.id}`}>
        <motion.div
          className="card-premium group cursor-pointer"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4 }}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Gold Divider */}
          <div className="mx-6 mt-0">
            <div className="h-px w-full" style={{ background: 'var(--gradient-gold)' }} />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-serif text-lg font-semibold text-secondary mb-1 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="price-tag">₹{product.price}</span>

              <motion.button
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: 'var(--gradient-gold-metallic)',
                  color: 'hsl(var(--primary-foreground))',
                  boxShadow: 'var(--shadow-gold)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                Add
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
