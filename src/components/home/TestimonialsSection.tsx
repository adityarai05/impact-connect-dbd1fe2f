import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Johnson", role: "Volunteer since 2023", quote: "Volunteering with ImpactHands changed my perspective on life. I've met incredible people and made real differences in my community." },
  { name: "Marcus Chen", role: "Team Lead", quote: "The platform makes it so easy to find and organize volunteer events. Our team participation has grown 300% since we started." },
  { name: "Priya Patel", role: "Student Volunteer", quote: "As a student, I wanted to give back but didn't know where to start. ImpactHands connected me with the perfect opportunities." },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-primary py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Quote className="mx-auto mb-6 h-10 w-10 text-secondary" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-6 text-xl font-medium leading-relaxed text-primary-foreground md:text-2xl">
                "{testimonials[current].quote}"
              </p>
              <p className="text-lg font-bold text-secondary">{testimonials[current].name}</p>
              <p className="text-sm text-primary-foreground/70">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={prev} className="rounded-full border border-primary-foreground/20 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/10">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-secondary" : "w-2 bg-primary-foreground/30"}`} />
              ))}
            </div>
            <button onClick={next} className="rounded-full border border-primary-foreground/20 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/10">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
