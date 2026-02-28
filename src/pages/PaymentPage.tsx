import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Smartphone, Wallet, Lock, Shield, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { generateOrderId } from "@/data/deliveryZones";
import PageTransition from "@/components/PageTransition";

type PaymentMethod = "upi" | "card" | "wallet";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, discount, deliveryCharge, total, selectedSector, selectedZone, clearCart, setOrderId } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  if (items.length === 0) {
    navigate("/");
    return null;
  }

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const orderId = generateOrderId();
    setOrderId(orderId);
    // Store order details for success page
    sessionStorage.setItem('kovish_last_order', JSON.stringify({
      orderId,
      items: items.map(i => ({ name: i.name, qty: i.quantity, price: i.price })),
      subtotal, discount, deliveryCharge, total,
      sector: selectedSector,
      zone: selectedZone,
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN'),
    }));
    clearCart();
    navigate("/order-success");
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length && i < 16; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background grain-texture">
        {/* Header */}
        <div className="border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Lock className="w-4 h-4" />
              Secure Checkout
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="order-2 md:order-1">
              <div className="bg-card rounded-2xl p-6 border border-border/50 sticky top-24" style={{ boxShadow: 'var(--shadow-card)' }}>
                <h2 className="font-serif text-2xl font-semibold text-secondary mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
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
                  <div className="flex justify-between text-xl font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-center gap-6 text-muted-foreground text-xs">
                    <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Encrypted</div>
                    <div className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure Payment</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="order-1 md:order-2">
              <div className="bg-card rounded-2xl p-6 border border-border/50" style={{ boxShadow: 'var(--shadow-card)' }}>
                <h2 className="font-serif text-2xl font-semibold text-secondary mb-6">Payment Method</h2>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {([
                    { id: "upi" as const, icon: Smartphone, label: "UPI" },
                    { id: "card" as const, icon: CreditCard, label: "Card" },
                    { id: "wallet" as const, icon: Wallet, label: "Wallet" },
                  ]).map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <method.icon className={`w-6 h-6 ${paymentMethod === method.id ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${paymentMethod === method.id ? "text-primary" : "text-muted-foreground"}`}>
                        {method.label}
                      </span>
                    </button>
                  ))}
                </div>

                {paymentMethod === "upi" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">UPI ID</label>
                      <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi" className="input-luxury" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                        <button key={app} className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted-foreground/15 transition-colors">{app}</button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "card" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                      <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} className="input-luxury" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Expiry</label>
                        <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" maxLength={5} className="input-luxury" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                        <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="•••" maxLength={4} className="input-luxury" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "wallet" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    {["Paytm Wallet", "PhonePe Wallet", "Amazon Pay", "Mobikwik"].map((wallet) => (
                      <button key={wallet} className="w-full p-4 border border-border rounded-xl text-left hover:bg-muted transition-colors flex items-center justify-between">
                        <span className="text-sm">{wallet}</span>
                        <span className="text-primary">→</span>
                      </button>
                    ))}
                  </motion.div>
                )}

                <motion.button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full mt-8 btn-gold py-4 text-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Pay ₹{total.toFixed(0)}</>
                  )}
                </motion.button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Your payment is securely encrypted with 256-bit SSL
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PaymentPage;
