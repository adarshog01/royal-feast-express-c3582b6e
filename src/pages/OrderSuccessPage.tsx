import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Home, MapPin, Truck } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import confetti from "canvas-confetti";

interface OrderDetails {
  orderId: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  sector: number;
  zone: string;
  date: string;
  time: string;
  paymentId?: string;
}

const OrderSuccessPage = () => {
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('kovish_last_order');
    if (stored) {
      setOrder(JSON.parse(stored));
    }

    // Gold confetti
    const duration = 3000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      const count = 40 * ((end - Date.now()) / duration);
      confetti({ ...defaults, particleCount: count, origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 }, colors: ["#C6A75E", "#8B6914", "#FFD700", "#2C1810"] });
      confetti({ ...defaults, particleCount: count, origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 }, colors: ["#C6A75E", "#8B6914", "#FFD700", "#2C1810"] });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background grain-texture px-4 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-lg w-full relative z-10"
        >
          {/* Gold checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{ background: 'hsl(42 60% 57% / 0.12)', border: '2px solid hsl(42 60% 57% / 0.3)' }}
          >
            <CheckCircle className="w-14 h-14 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-3"
          >
            Order Confirmed!
          </motion.h1>

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-primary font-serif text-xl font-semibold mb-1">{order.orderId}</p>
              {order.paymentId && (
                <p className="text-muted-foreground text-xs mb-1">Payment ID: {order.paymentId}</p>
              )}
              <p className="text-muted-foreground text-sm">{order.date} at {order.time}</p>
            </motion.div>
          )}

          {/* Order Details Card */}
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl p-6 mb-8 text-left border border-border/50"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{order.subtotal}</span></div>
                {order.discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>-₹{order.discount.toFixed(0)}</span></div>}
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Sector {order.sector} ({order.zone})</span>
                  <span>₹{order.deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                  <span>Total Paid</span>
                  <span className="text-primary">₹{order.total.toFixed(0)}</span>
                </div>
              </div>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground mb-8"
          >
            Your delicious food is being prepared! 🛵
            <br />
            <span className="text-sm">We'll deliver it fresh and hot to your doorstep.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <div className="divider-royal mb-8" />
            <p className="font-serif text-xl text-primary mb-8">Thank you for choosing Kovish!</p>
            <Link to="/">
              <motion.button className="btn-gold flex items-center justify-center gap-3 mx-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default OrderSuccessPage;
