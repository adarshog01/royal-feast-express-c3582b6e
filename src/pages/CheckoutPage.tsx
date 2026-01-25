import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import PageTransition from "@/components/PageTransition";
const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    discount,
    total
  } = useCart();
  const [locationSelected, setLocationSelected] = useState(false);
  const [callConfirmed, setCallConfirmed] = useState(false);
  const [showCallNotice, setShowCallNotice] = useState(false);
  const handleProceedToPayment = () => {
    if (!locationSelected || !callConfirmed) return;
    navigate("/payment");
  };
  const handleCallClick = () => {
    window.location.href = "tel:+919999999999";
    setShowCallNotice(true);
  };
  if (items.length === 0) {
    return <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
          <button onClick={() => navigate("/")} className="btn-gold">
            Go to Menu
          </button>
        </div>
      </div>;
  }
  return <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-2">
              Checkout
            </h1>
            <div className="divider-royal" />
          </motion.div>

          {/* Order Summary */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="bg-card rounded-2xl p-6 mb-6 shadow-lg">
            <h2 className="font-serif text-xl font-semibold text-secondary mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-4">
              {items.map(item => <div key={item.id} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>)}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && <div className="flex justify-between text-sm text-green-600">
                  <span>Discount (10%)</span>
                  <span>-₹{discount.toFixed(0)}</span>
                </div>}
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(0)}</span>
              </div>
            </div>
          </motion.div>

          {/* Delivery Location */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="bg-card rounded-2xl p-6 mb-6 shadow-lg">
            <h2 className="font-serif text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Delivery Location
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              We currently deliver only in Sonipat, Haryana
            </p>
            <label className="flex items-center gap-3 p-4 bg-background rounded-xl cursor-pointer hover:bg-muted transition-colors">
              <input type="radio" name="location" checked={locationSelected} onChange={() => setLocationSelected(true)} className="w-5 h-5 accent-primary" />
              <div className="flex-1">
                <span className="font-medium">Sonipat, Haryana, India</span>
                <p className="text-sm text-muted-foreground">Within city limits</p>
              </div>
              {locationSelected && <CheckCircle2 className="w-5 h-5 text-green-600" />}
            </label>
          </motion.div>

          {/* Call Confirmation */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="bg-card rounded-2xl p-6 mb-6 shadow-lg">
            <h2 className="font-serif text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Confirm Your Location
            </h2>

            {/* Call Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium">Important</p>
                  <p className="text-amber-700 text-sm">
                    Please call to confirm your exact location before payment.
                  </p>
                </div>
              </div>
            </div>

            {/* Call Button */}
            <motion.button onClick={handleCallClick} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors mb-4" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              <Phone className="w-5 h-5" />
              Call +91 86838 93710  
            </motion.button>

            {/* Confirmation Checkbox */}
            <AnimatePresence>
              {showCallNotice && <motion.label initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="flex items-center gap-3 p-4 bg-background rounded-xl cursor-pointer">
                  <input type="checkbox" checked={callConfirmed} onChange={e => setCallConfirmed(e.target.checked)} className="w-5 h-5 accent-primary" />
                  <span className="text-sm">
                    ✅ I have called and confirmed my delivery location
                  </span>
                </motion.label>}
            </AnimatePresence>
          </motion.div>

          {/* Pay Button */}
          <motion.button initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} onClick={handleProceedToPayment} disabled={!locationSelected || !callConfirmed} className={`w-full btn-gold py-4 text-lg ${!locationSelected || !callConfirmed ? "opacity-50 cursor-not-allowed" : ""}`} whileHover={locationSelected && callConfirmed ? {
          scale: 1.02
        } : {}} whileTap={locationSelected && callConfirmed ? {
          scale: 0.98
        } : {}}>
            PAY NOW - ₹{total.toFixed(0)}
          </motion.button>

          {(!locationSelected || !callConfirmed) && <p className="text-center text-sm text-muted-foreground mt-3">
              {!locationSelected && "Please select your delivery location"}
              {locationSelected && !callConfirmed && "Please call and confirm your location"}
            </p>}
        </div>
      </div>
    </PageTransition>;
};
export default CheckoutPage;