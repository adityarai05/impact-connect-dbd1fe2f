import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, DollarSign } from "lucide-react";
import { allGigs } from "@/data/gigs";

const opportunities = allGigs.slice(0, 4);

const FeaturedOpportunities = () => {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">Make a Difference</span>
          <h2 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">Featured Opportunities</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Find the perfect way to give back. Every hour you volunteer creates lasting change.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={opp.image} alt={opp.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {opp.cause}
                </span>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-card-foreground">{opp.title}</h3>
                <div className="mb-4 flex flex-col gap-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {opp.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {opp.duration}</span>
                </div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
                  <DollarSign className="h-4 w-4" /> Earn ₹{opp.gigEarning}
                </div>
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link to={`/gigs/${opp.id}`}>View Details</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/opportunities">View All Opportunities <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
