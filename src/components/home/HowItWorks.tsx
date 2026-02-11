import { motion } from "framer-motion";
import { UserPlus, Search, HandHeart } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Sign Up", description: "Create your free account in under a minute and join our community of changemakers." },
  { icon: Search, title: "Find Opportunities", description: "Browse volunteer opportunities that match your skills, interests, and schedule." },
  { icon: HandHeart, title: "Make an Impact", description: "Show up, give your time, and create real change in your community." },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">Simple Process</span>
          <h2 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">How It Works</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-0.5 w-full translate-x-1/2 bg-border md:block" />
              )}
              <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-lg">
                <step.icon className="h-9 w-9" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mx-auto max-w-xs text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
