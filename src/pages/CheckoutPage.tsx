import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, CheckCircle2, AlertCircle, Truck, ChevronDown, User, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";
import PageTransition from "@/components/PageTransition";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    items, subtotal, discount, deliveryCharge, total,
    selectedSector, setSelectedSector,
    customerName, setCustomerName,
    phoneNumber, setPhoneNumber,
    fullAddress, setFullAddress,
    landmark, setLandmark,
  } = useCart();
  const [callConfirmed, setCallConfirmed] = useState(false);
  const [showCallNotice, setShowCallNotice] = useState(false);

  const handleProceedToPayment = () => {
    if (!selectedSector || !callConfirmed) return;
    if (!customerName.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }
    if (!fullAddress.trim()) {
      alert("Please enter your full address.");
      return;
    }
    navigate("/payment");
  };

  const handleCallClick = () => {
    window.location.href = "tel:+918353964663";
    setShowCallNotice(true);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4 font-serif">Your cart is empty</p>
          <button onClick={() => navigate("/")} className="btn-gold">Go to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-background grain-texture">
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-3">Checkout</h1>
            <div className="divider-royal" />
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 mb-6 border border-border/50"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="font-serif text-xl font-semibold text-secondary mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-primary">
                  <span>Discount (10%)</span>
                  <span>-₹{discount.toFixed(0)}</span>
                </div>
              )}
              {selectedSector && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Delivery (Sector {selectedSector})</span>
                  <span>₹{deliveryCharge}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(0)}</span>
              </div>
            </div>
          </motion.div>

          {/* Sector Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-6 mb-6 border border-border/50"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="font-serif text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Delivery Sector
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              Select your sector in Sonipat for delivery
            </p>

            <div className="relative">
              <select
                value={selectedSector || ""}
                onChange={(e) => setSelectedSector(e.target.value ? parseInt(e.target.value) : null)}
                className="input-luxury appearance-none pr-10 cursor-pointer"
              >
                <option value="">Select your sector...</option>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((sector) => (
                  <option key={sector} value={sector}>
                    Sector {sector}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {selectedSector && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl border flex items-center gap-3"
                style={{ background: 'hsl(42 60% 57% / 0.06)', borderColor: 'hsl(42 60% 57% / 0.3)' }}
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="font-medium text-sm">Sector {selectedSector} selected</p>
              </motion.div>
            )}
          </motion.div>

          {/* Customer Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card rounded-2xl p-6 mb-6 border border-border/50"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="font-serif text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Delivery Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="input-luxury"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className="input-luxury"
                  maxLength={10}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full Address *</label>
                <textarea
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="House/Flat No., Street, Area"
                  className="input-luxury min-h-[80px] resize-none"
                  maxLength={500}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Landmark <span className="text-xs">(optional)</span></label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Near park, school, etc."
                  className="input-luxury"
                  maxLength={200}
                />
              </div>
            </div>
          </motion.div>

          {/* Call Confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6 mb-6 border border-border/50"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="font-serif text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Confirm Your Location
            </h2>

            <div className="rounded-xl p-4 mb-4 border" style={{ background: 'hsl(42 60% 57% / 0.06)', borderColor: 'hsl(42 60% 57% / 0.2)' }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-secondary font-medium text-sm">Important</p>
                  <p className="text-muted-foreground text-sm">
                    Please call to confirm your exact delivery location before payment.
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleCallClick}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-colors mb-4"
              style={{ background: '#25D366', color: 'white' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              Call +91 83539 64663
            </motion.button>

            <AnimatePresence>
              {showCallNotice && (
                <motion.label
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-background rounded-xl cursor-pointer border border-border/50"
                >
                  <input
                    type="checkbox"
                    checked={callConfirmed}
                    onChange={(e) => setCallConfirmed(e.target.checked)}
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-sm">✅ I have called and confirmed my delivery location</span>
                </motion.label>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pay Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleProceedToPayment}
            disabled={!selectedSector || !callConfirmed}
            className={`w-full btn-gold py-4 text-lg ${
              !selectedSector || !callConfirmed ? "opacity-40 cursor-not-allowed" : ""
            }`}
            whileHover={selectedSector && callConfirmed ? { scale: 1.02 } : {}}
            whileTap={selectedSector && callConfirmed ? { scale: 0.98 } : {}}
          >
            PAY NOW — ₹{total.toFixed(0)}
          </motion.button>

          {(!selectedSector || !callConfirmed) && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              {!selectedSector ? "Please select your delivery sector" : "Please call and confirm your location"}
            </p>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default CheckoutPage;