import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Filter, Search, X, DollarSign, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import foodImg from "@/assets/opportunity-food.jpg";
import eduImg from "@/assets/opportunity-education.jpg";
import envImg from "@/assets/opportunity-environment.jpg";
import housingImg from "@/assets/opportunity-housing.jpg";

const allOpportunities = [
  { id: 1, title: "Community Food Drive", location: "Downtown Center", duration: "4 hours", cause: "Hunger Relief", type: "In-person", skill: "General", image: foodImg, desc: "Help collect and distribute food packages to families in need across the downtown area.", gigEarning: 500, gigDesc: "Earn by coordinating distribution logistics and managing inventory." },
  { id: 2, title: "Youth Education Program", location: "Lincoln School", duration: "3 hours/week", cause: "Education", type: "In-person", skill: "Teaching", image: eduImg, desc: "Tutor and mentor young students in reading, math, and life skills.", gigEarning: 800, gigDesc: "Earn by leading tutoring sessions and creating learning materials." },
  { id: 3, title: "Park Restoration Project", location: "Greenfield Park", duration: "Full day", cause: "Environment", type: "In-person", skill: "General", image: envImg, desc: "Help restore the local park by planting trees and cleaning up the area.", gigEarning: 600, gigDesc: "Earn by managing planting teams and reporting restoration progress." },
  { id: 4, title: "Housing Build Weekend", location: "Eastside District", duration: "2 days", cause: "Housing", type: "In-person", skill: "Construction", image: housingImg, desc: "Build safe and affordable housing for families who need it most.", gigEarning: 1200, gigDesc: "Earn by leading construction crews and quality inspections." },
  { id: 5, title: "Online Tutoring", location: "Remote", duration: "2 hours/week", cause: "Education", type: "Online", skill: "Teaching", image: eduImg, desc: "Provide virtual tutoring sessions to students from underserved communities.", gigEarning: 400, gigDesc: "Earn per session by tutoring students online." },
  { id: 6, title: "Meal Preparation", location: "Community Kitchen", duration: "5 hours", cause: "Hunger Relief", type: "In-person", skill: "Cooking", image: foodImg, desc: "Cook and prepare nutritious meals for community distribution events.", gigEarning: 550, gigDesc: "Earn by leading meal prep and kitchen management." },
  { id: 7, title: "Tree Planting Initiative", location: "City Parks", duration: "Half day", cause: "Environment", type: "In-person", skill: "General", image: envImg, desc: "Join our city-wide tree planting initiative to create greener urban spaces.", gigEarning: 450, gigDesc: "Earn by coordinating planting locations and volunteer groups." },
  { id: 8, title: "Home Repair Assistance", location: "Various Locations", duration: "Flexible", cause: "Housing", type: "In-person", skill: "Construction", image: housingImg, desc: "Help elderly homeowners with essential home repairs and maintenance.", gigEarning: 700, gigDesc: "Earn by completing skilled repair tasks independently." },
];

const causes = ["All", "Hunger Relief", "Education", "Environment", "Housing"];
const types = ["All", "In-person", "Online"];

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCause, setSelectedCause] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const { user } = useAuth();

  const filtered = allOpportunities.filter((opp) => {
    const matchCause = selectedCause === "All" || opp.cause === selectedCause;
    const matchType = selectedType === "All" || opp.type === selectedType;
    const matchSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || opp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCause && matchType && matchSearch;
  });

  return (
    <main>
      <section className="gradient-primary py-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Volunteer Opportunities</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Find the perfect way to make a difference. Volunteer and earn through gigs!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gig Earning Banner */}
      <section className="border-b border-border bg-accent/10 py-4">
        <div className="container flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2">
            <DollarSign className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent">Earn Through Gigs</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Register as a volunteer and earn by completing gig-based tasks. Each opportunity shows potential earnings.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {/* Filters */}
          <div className="mb-8 space-y-4 rounded-2xl bg-card p-6 shadow-card">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {causes.map((cause) => (
                  <button
                    key={cause}
                    onClick={() => setSelectedCause(cause)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${selectedCause === cause ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {cause}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${selectedType === type ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <p className="mb-4 text-sm text-muted-foreground">{filtered.length} opportunities found</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((opp, i) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={opp.image} alt={opp.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{opp.cause}</span>
                    <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-card-foreground backdrop-blur-sm">{opp.type}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-1 text-lg font-bold text-card-foreground">{opp.title}</h3>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{opp.desc}</p>
                  <div className="mb-3 flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {opp.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {opp.duration}</span>
                  </div>

                  {/* Gig Earnings Section */}
                  <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="h-4 w-4 text-accent" />
                      <span className="text-sm font-semibold text-accent">Earn Through Gigs</span>
                      <span className="ml-auto text-base font-bold text-accent">₹{opp.gigEarning}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{opp.gigDesc}</p>
                  </div>

                  <Button variant="hero" size="sm" className="w-full" asChild>
                    <Link to={user ? `/opportunities/apply?title=${encodeURIComponent(opp.title)}` : "/auth"}>
                      Apply Now
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No opportunities match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Opportunities;
