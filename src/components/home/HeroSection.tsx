import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import heroImage from "@/assets/hero-volunteers.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Volunteers making a difference in the community" className="h-full w-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      <div className="container relative z-10 flex min-h-[85vh] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl space-y-6"
        >
          <span className="inline-block rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            🌍 Join 500+ volunteers making a difference
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Be the Change.{" "}
            <span className="block">Make an Impact Today.</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg text-primary-foreground/80 sm:text-xl">
            Connect with meaningful volunteer opportunities in your community and around the world. Your time can transform lives.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/opportunities">
                Volunteer Now <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/about">
                <PlayCircle className="h-5 w-5" /> Explore Our Impact
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.5C672 45.7 768 56.3 864 58.8C960 61.3 1056 55.7 1152 50C1248 44.3 1344 38.7 1392 35.8L1440 33V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
