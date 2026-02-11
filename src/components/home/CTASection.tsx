import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl gradient-primary p-12 text-center md:p-16"
        >
          <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground md:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-lg text-primary-foreground/80">
            Join thousands of volunteers and start creating positive change in your community today.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="secondary" size="xl" asChild>
              <Link to="/opportunities">Start Volunteering Today <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/donate">Support Our Mission</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
