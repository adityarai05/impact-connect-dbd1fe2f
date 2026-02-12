import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Heart,
  Globe,
  Target,
  Calendar,
  MapPin,
  Award,
  Play,
} from "lucide-react";
import heroImage from "@/assets/hero-volunteers.jpg";
import foodImg from "@/assets/opportunity-food.jpg";
import eduImg from "@/assets/opportunity-education.jpg";
import envImg from "@/assets/opportunity-environment.jpg";
import housingImg from "@/assets/opportunity-housing.jpg";

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

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "Volunteers Mobilized" },
  { icon: Heart, value: 25000, suffix: "+", label: "Lives Touched" },
  { icon: Globe, value: 200, suffix: "+", label: "Communities Reached" },
  { icon: Calendar, value: 350, suffix: "+", label: "Programs Conducted" },
];

const galleryImages = [heroImage, foodImg, eduImg, envImg, housingImg];

const timeline = [
  { year: "2019", title: "Initiative Launched", desc: "Started with 50 volunteers across 3 cities." },
  { year: "2020", title: "Pandemic Response", desc: "Mobilized 500+ volunteers for food and medical supply distribution." },
  { year: "2021", title: "Education Drive", desc: "Launched after-school tutoring programs in 20 communities." },
  { year: "2022", title: "Environmental Campaign", desc: "Planted 10,000 trees and organized 50 clean-up drives." },
  { year: "2023", title: "National Expansion", desc: "Expanded to 15 states with dedicated regional coordinators." },
  { year: "2024", title: "Digital Volunteering", desc: "Launched online mentoring and skill-building programs." },
  { year: "2025", title: "25,000 Lives Impacted", desc: "Reached our landmark milestone across all verticals." },
];

const testimonials = [
  { name: "Priya S.", role: "Youth Volunteer", quote: "This program gave me a sense of purpose. I've grown as a leader and as a person." },
  { name: "Rahul M.", role: "Community Coordinator", quote: "Seeing the direct impact on families in my neighborhood has been incredibly fulfilling." },
  { name: "Anita K.", role: "Corporate Partner", quote: "Partnering with ImpactHands allowed our employees to give back meaningfully." },
];

const OurWork = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Volunteers in action" className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="container relative z-10 flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl space-y-6">
            <span className="inline-block rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              🇮🇳 Our Flagship Initiative
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl md:text-6xl">
              Empowering Every Indian to Volunteer
            </h1>
            <p className="mx-auto max-w-xl text-lg text-primary-foreground/80">
              Building a nation of changemakers — one volunteer at a time. Join the movement that's transforming communities across India.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/get-involved/volunteer">Join the Movement <ArrowRight className="h-5 w-5" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container grid gap-8 md:grid-cols-2">
          {[
            { icon: Target, title: "Our Vision", text: "A nation where every citizen actively contributes to community well-being through volunteerism, creating a self-sustaining ecosystem of support and growth." },
            { icon: Heart, title: "Our Mission", text: "To make volunteering accessible, rewarding, and impactful for every Indian — regardless of age, background, or location — by connecting them with causes that matter." },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="rounded-2xl bg-card p-8 shadow-card">
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-card-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">Our Impact in Numbers</h2>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-3 text-center">
                <div className="rounded-2xl bg-primary/10 p-3"><stat.icon className="h-7 w-7 text-primary" /></div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {galleryImages.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group overflow-hidden rounded-2xl">
                <img src={img} alt={`Program photo ${i + 1}`} className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="bg-muted/50 py-20">
        <div className="container text-center">
          <h2 className="mb-8 text-3xl font-extrabold text-foreground md:text-4xl">Watch Our Story</h2>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-card">
            <div className="relative aspect-video bg-card">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <Play className="mx-auto mb-4 h-16 w-16 text-primary/40" />
                  <p className="text-muted-foreground">Video coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">Our Journey</h2>
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative mb-10 pl-12 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
                <div className={`absolute left-2.5 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-auto ${i % 2 === 0 ? "md:-right-2" : "md:-left-2"}`} />
                <span className="text-sm font-bold text-secondary">{item.year}</span>
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">What People Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-card p-8 shadow-card">
                <p className="mb-6 text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-card-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="overflow-hidden rounded-3xl gradient-primary p-12 text-center md:p-16">
            <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground md:text-4xl">Ready to Volunteer?</h2>
            <p className="mx-auto mb-8 max-w-lg text-lg text-primary-foreground/80">Join thousands of Indians who are creating change every day.</p>
            <Button variant="secondary" size="xl" asChild>
              <Link to="/get-involved/volunteer">Join Now <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default OurWork;
