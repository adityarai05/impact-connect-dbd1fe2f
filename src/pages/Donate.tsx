import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Shield, PieChart, DollarSign } from "lucide-react";

const amounts = [10, 25, 50, 100, 250, 500];

const Donate = () => {
  const [selected, setSelected] = useState(50);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);

  const activeAmount = custom ? Number(custom) : selected;

  return (
    <main>
      <section className="gradient-primary py-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Support Our Mission</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Every donation helps us create meaningful change in communities worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-card p-8 shadow-card">
              {/* Toggle */}
              <div className="mb-8 flex justify-center">
                <div className="flex rounded-full bg-muted p-1">
                  <button onClick={() => setRecurring(false)} className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${!recurring ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"}`}>One-time</button>
                  <button onClick={() => setRecurring(true)} className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${recurring ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"}`}>Monthly</button>
                </div>
              </div>

              {/* Amounts */}
              <div className="mb-6 grid grid-cols-3 gap-3">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelected(amt); setCustom(""); }}
                    className={`rounded-xl border-2 py-3 text-lg font-bold transition-all ${selected === amt && !custom ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom */}
              <div className="relative mb-6">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="h-12 w-full rounded-xl border-2 border-input bg-background pl-10 pr-4 text-lg font-medium outline-none focus:border-primary focus:ring-2 focus:ring-ring"
                />
              </div>

              <Button variant="hero" size="xl" className="mb-6 w-full">
                <Heart className="h-5 w-5" /> Donate ${activeAmount || 0} {recurring ? "/ month" : ""}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" /> Secure, encrypted payment
              </div>
            </motion.div>

            {/* Transparency */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
              <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Where Your Money Goes</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Programs & Services", pct: "75%", color: "bg-primary" },
                  { label: "Operations", pct: "15%", color: "bg-secondary" },
                  { label: "Fundraising", pct: "10%", color: "bg-accent" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-card p-6 text-center shadow-card">
                    <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${item.color}`}>
                      <span className="text-lg font-bold text-primary-foreground">{item.pct}</span>
                    </div>
                    <p className="text-sm font-medium text-card-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Donate;
