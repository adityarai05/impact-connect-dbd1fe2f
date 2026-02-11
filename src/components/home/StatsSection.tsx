import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Heart, Globe, Calendar } from "lucide-react";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Active Volunteers" },
  { icon: Heart, value: 10000, suffix: "+", label: "Lives Impacted" },
  { icon: Globe, value: 150, suffix: "+", label: "Community Projects" },
  { icon: Calendar, value: 200, suffix: "+", label: "Events Hosted" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-primary md:text-5xl">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const StatsSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="rounded-2xl bg-primary/10 p-3">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
