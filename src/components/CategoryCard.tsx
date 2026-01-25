import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Category } from "@/data/menuData";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link to={`/${category.slug}`}>
        <motion.div
          className="category-card aspect-square relative group"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image */}
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-6">
            <motion.span 
              className="text-4xl mb-2"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              {category.icon}
            </motion.span>
            <h3 className="font-serif text-2xl md:text-3xl text-cream font-semibold text-center">
              {category.name}
            </h3>
          </div>

          {/* Hover Border Effect */}
          <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-3 border-2 border-primary/50 rounded-xl" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
