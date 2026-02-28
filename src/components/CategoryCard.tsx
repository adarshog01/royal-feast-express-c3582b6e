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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link to={`/${category.slug}`}>
        <motion.div
          className="category-card aspect-[3/4] relative group"
          whileHover={{ y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {/* Image with zoom */}
          <motion.img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-8">
            <span className="text-4xl mb-3">{category.icon}</span>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-2" style={{ color: 'hsl(38 50% 94%)' }}>
              {category.name}
            </h3>
            <div className="h-px w-12 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'var(--gradient-gold)' }} />
          </div>

          {/* Hover gold border */}
          <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-3 border rounded-2xl" style={{ borderColor: 'hsl(42 60% 57% / 0.4)' }} />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
