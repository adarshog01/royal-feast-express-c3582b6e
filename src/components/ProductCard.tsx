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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`}>
        <motion.div
          className="card-premium group cursor-pointer"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-serif text-lg font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between">
              <span className="price-tag">₹{product.price}</span>
              
              <motion.button
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-all hover:bg-primary/90"
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
