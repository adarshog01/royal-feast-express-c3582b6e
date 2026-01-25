import momosImg from "@/assets/momos.jpg";
import kathiRollImg from "@/assets/kathi-roll.jpg";
import burgerImg from "@/assets/burger.jpg";
import coldCoffeeImg from "@/assets/cold-coffee.jpg";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "momos", name: "Momos", slug: "momos", image: momosImg, icon: "🥟" },
  { id: "kathi-rolls", name: "Kathi Rolls", slug: "kathi-rolls", image: kathiRollImg, icon: "🌯" },
  { id: "burgers", name: "Burgers", slug: "burgers", image: burgerImg, icon: "🍔" },
  { id: "cold-coffee", name: "Cold Coffee", slug: "cold-coffee", image: coldCoffeeImg, icon: "🥤" },
];

export const menuItems: MenuItem[] = [
  // Momos
  { id: "veg-steam-momo", name: "Veg Steam Momo", price: 65, description: "Delicate steamed dumplings filled with fresh vegetables, served with spicy red chutney and green chutney.", category: "momos", image: momosImg },
  { id: "paneer-steam-momo", name: "Paneer Steam Momo", price: 85, description: "Soft steamed momos stuffed with creamy paneer and aromatic spices.", category: "momos", image: momosImg },
  { id: "veg-fried-momo", name: "Veg Fried Momo", price: 75, description: "Crispy golden fried momos with vegetable filling, served with tangy dipping sauce.", category: "momos", image: momosImg },
  { id: "paneer-fried-momo", name: "Paneer Fried Momo", price: 95, description: "Crunchy fried dumplings filled with spiced paneer, perfect for snacking.", category: "momos", image: momosImg },
  
  // Kathi Rolls
  { id: "paneer-roll", name: "Paneer Roll", price: 120, description: "Classic paneer tikka wrapped in a flaky paratha with onions and chutneys.", category: "kathi-rolls", image: kathiRollImg },
  { id: "paneer-bhurji-roll", name: "Paneer Bhurji Roll", price: 130, description: "Scrambled paneer with peppers and spices rolled in a warm paratha.", category: "kathi-rolls", image: kathiRollImg },
  { id: "paneer-butter-roll", name: "Paneer Butter Roll", price: 140, description: "Creamy butter paneer wrapped in buttery paratha, rich and satisfying.", category: "kathi-rolls", image: kathiRollImg },
  { id: "paneer-malai-roll", name: "Paneer Malai Roll", price: 150, description: "Tender paneer in creamy malai gravy, wrapped in a soft paratha.", category: "kathi-rolls", image: kathiRollImg },
  { id: "chilli-paneer-roll", name: "Chilli Paneer Roll", price: 140, description: "Indo-Chinese style chilli paneer in a crispy paratha wrap.", category: "kathi-rolls", image: kathiRollImg },
  { id: "peri-peri-paneer-roll", name: "Peri-Peri Paneer Roll", price: 140, description: "Spicy peri-peri seasoned paneer with fresh veggies in a roll.", category: "kathi-rolls", image: kathiRollImg },
  { id: "kashmiri-paneer-roll", name: "Kashmiri Paneer Roll", price: 130, description: "Mildly spiced Kashmiri style paneer wrapped with love.", category: "kathi-rolls", image: kathiRollImg },
  { id: "lemon-paneer-roll", name: "Lemon Paneer Roll", price: 140, description: "Zesty lemon-infused paneer with fresh herbs in a paratha.", category: "kathi-rolls", image: kathiRollImg },
  { id: "cheese-paneer-roll", name: "Cheese Paneer Roll", price: 150, description: "Loaded with melted cheese and grilled paneer, pure indulgence.", category: "kathi-rolls", image: kathiRollImg },
  { id: "tandoori-paneer-roll", name: "Tandoori Paneer Roll", price: 150, description: "Smoky tandoori paneer with mint chutney in a warm wrap.", category: "kathi-rolls", image: kathiRollImg },
  { id: "soya-chaap-roll", name: "Soya Chaap Roll", price: 120, description: "Tender soya chaap marinated in spices, wrapped to perfection.", category: "kathi-rolls", image: kathiRollImg },
  { id: "malai-chaap-roll", name: "Malai Chaap Roll", price: 140, description: "Creamy malai chaap with aromatic spices in a flaky paratha.", category: "kathi-rolls", image: kathiRollImg },
  { id: "lemon-chaap-roll", name: "Lemon Chaap Roll", price: 130, description: "Tangy lemon-marinated chaap wrapped with fresh vegetables.", category: "kathi-rolls", image: kathiRollImg },
  { id: "afghani-chaap-roll", name: "Afghani Chaap Roll", price: 140, description: "Rich Afghani-style cream chaap in a delicious paratha roll.", category: "kathi-rolls", image: kathiRollImg },
  { id: "cheese-corn-roll", name: "Cheese Corn Roll", price: 120, description: "Sweet corn and melted cheese rolled in a crispy paratha.", category: "kathi-rolls", image: kathiRollImg },
  { id: "pizza-roll", name: "Pizza Roll", price: 140, description: "Pizza-flavored filling with cheese and herbs in a roll format.", category: "kathi-rolls", image: kathiRollImg },
  { id: "makhani-paneer-roll", name: "Makhani Paneer Roll", price: 150, description: "Rich makhani gravy paneer wrapped in buttery paratha.", category: "kathi-rolls", image: kathiRollImg },
  { id: "achari-paneer-roll", name: "Achari Paneer Roll", price: 150, description: "Tangy pickle-spiced paneer with bold Indian flavors.", category: "kathi-rolls", image: kathiRollImg },
  { id: "garlic-paneer-roll", name: "Garlic Paneer Roll", price: 140, description: "Aromatic garlic-infused paneer in a warm paratha wrap.", category: "kathi-rolls", image: kathiRollImg },
  { id: "makhani-chaap-roll", name: "Makhani Chaap Roll", price: 140, description: "Creamy makhani chaap wrapped in a soft, flaky paratha.", category: "kathi-rolls", image: kathiRollImg },
  
  // Burgers
  { id: "aloo-tikki-burger", name: "Aloo Tikki Burger", price: 75, description: "Classic Indian street-style burger with crispy aloo tikki patty.", category: "burgers", image: burgerImg },
  { id: "cheese-burger", name: "Cheese Burger", price: 85, description: "Loaded with melted cheese and fresh vegetables in a soft bun.", category: "burgers", image: burgerImg },
  { id: "paneer-cheese-burger", name: "Paneer Cheese Burger", price: 95, description: "Premium paneer patty with double cheese, lettuce, and special sauce.", category: "burgers", image: burgerImg },
  
  // Cold Coffee
  { id: "creamy-cold-coffee", name: "Creamy Cold Coffee", price: 120, description: "Rich and creamy cold coffee blended with ice cream and topped with cream.", category: "cold-coffee", image: coldCoffeeImg },
  { id: "caramel-cold-coffee", name: "Caramel Cold Coffee", price: 130, description: "Indulgent caramel drizzled cold coffee with whipped cream.", category: "cold-coffee", image: coldCoffeeImg },
  { id: "hazelnut-cold-coffee", name: "Hazelnut Cold Coffee", price: 130, description: "Premium hazelnut flavored cold coffee for the coffee connoisseur.", category: "cold-coffee", image: coldCoffeeImg },
];

export const getMenuItemsByCategory = (categorySlug: string): MenuItem[] => {
  return menuItems.filter(item => item.category === categorySlug);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};
