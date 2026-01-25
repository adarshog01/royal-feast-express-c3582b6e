import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, Tag, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    isCartOpen,
    closeCart,
  } = useCart();
  
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleApplyCoupon = () => {
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponSuccess(true);
      setCouponError(false);
      setTimeout(() => setCouponSuccess(false), 2000);
    } else {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    }
  };

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-2xl font-semibold text-secondary">Your Cart</h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg">Your cart is empty</p>
                  <p className="text-sm">Add some delicious items!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 p-4 bg-card rounded-xl"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-serif font-semibold text-secondary">{item.name}</h4>
                          <p className="text-primary font-semibold">₹{item.price}</p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center bg-muted rounded-full hover:bg-muted-foreground/20 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-muted rounded-full hover:bg-muted-foreground/20 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:bg-destructive/10 p-2 rounded-full transition-colors self-start"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                {/* Coupon Section */}
                {!couponCode ? (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 text-green-700">
                      <Tag className="w-4 h-4" />
                      <span className="font-medium">{couponCode}</span>
                      <span className="text-sm">- 10% OFF</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-green-700 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Error/Success Messages */}
                <AnimatePresence>
                  {couponError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-destructive text-sm"
                    >
                      Invalid coupon code
                    </motion.p>
                  )}
                  {couponSuccess && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-600 text-sm font-medium"
                    >
                      ✨ Coupon Applied Successfully!
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  className="w-full btn-gold py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
