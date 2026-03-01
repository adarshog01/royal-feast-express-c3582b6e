import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Shield, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { generateOrderId } from "@/data/deliveryZones";
import PageTransition from "@/components/PageTransition";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RAZORPAY_KEY = "rzp_test_SLwOCZEcOZJQGX";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, discount, deliveryCharge, total, selectedSector, selectedZone, clearCart, setOrderId } = useCart();
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    navigate("/");
    return null;
  }

  const handlePayment = () => {
    if (processing) return;
    setProcessing(true);

    const amountInPaise = Math.round(total * 100);
    const orderId = generateOrderId();

    // Store order data in localStorage BEFORE opening Razorpay
    localStorage.setItem("kovish_orderId", orderId);
    localStorage.setItem("kovish_sector", String(selectedSector || ""));
    localStorage.setItem("kovish_zone", selectedZone || "");
    localStorage.setItem("kovish_cartItems", JSON.stringify(items.map(i => ({ name: i.name, qty: i.quantity, price: i.price }))));
    localStorage.setItem("kovish_subtotal", String(subtotal));
    localStorage.setItem("kovish_discount", String(discount));
    localStorage.setItem("kovish_delivery", String(deliveryCharge));
    localStorage.setItem("kovish_total", String(total));

    const options = {
      key: RAZORPAY_KEY,
      amount: amountInPaise,
      currency: "INR",
      name: "Kovish",
      description: "Order Payment",
      handler: function (response: any) {
        // Only redirect — fetch happens on order-success page
        clearCart();
        window.location.href = "/order-success?payment_id=" + response.razorpay_payment_id;
      },
      modal: {
        ondismiss: () => {
          setProcessing(false);
          toast.error("Payment was cancelled. You can try again.");
        },
      },
      prefill: {},
      theme: {
        color: "#C6A75E",
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        setProcessing(false);
        toast.error("Payment failed. Please try again.");
        console.error("Payment failed:", response.error);
      });
      rzp.open();
    } catch (err) {
      setProcessing(false);
      toast.error("Could not open payment gateway. Please try again.");
      console.error("Razorpay error:", err);
    }
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
          <div className="max-w-lg mx-auto">
            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-card rounded-2xl p-6 border border-border/50" style={{ boxShadow: 'var(--shadow-card)' }}>
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

                <motion.button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full mt-8 btn-gold py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={!processing ? { scale: 1.02 } : {}}
                  whileTap={!processing ? { scale: 0.98 } : {}}
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

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-center gap-6 text-muted-foreground text-xs">
                    <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Encrypted</div>
                    <div className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure Payment</div>
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Powered by Razorpay • Your payment is securely encrypted
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PaymentPage;
