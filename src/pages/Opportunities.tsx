import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Filter, Search, X, DollarSign, Briefcase, Calendar, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { allGigs, causes, types } from "@/data/gigs";

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCause, setSelectedCause] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filtered = allGigs.filter((gig) => {
    const matchCause = selectedCause === "All" || gig.cause === selectedCause;
    const matchType = selectedType === "All" || gig.type === selectedType;
    const matchSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) || gig.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCause && matchType && matchSearch;
  });

  return (
    <main>
      <section className="gradient-primary py-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Earn Through Gigs</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Volunteer, make a difference, and earn through gig-based opportunities.
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
            Browse gigs, read full details, and enroll to start earning.
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
                placeholder="Search gigs by title or location..."
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
          <p className="mb-4 text-sm text-muted-foreground">{filtered.length} gigs found</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((gig, i) => (
              <motion.div
                key={gig.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={gig.image} alt={gig.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{gig.cause}</span>
                    <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-card-foreground backdrop-blur-sm">{gig.type}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-1 text-lg font-bold text-card-foreground">{gig.title}</h3>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{gig.desc}</p>
                  <div className="mb-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {gig.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {gig.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {gig.duration}</span>
                  </div>

                  {/* Skills Tags */}
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {gig.skills.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s}</span>
                    ))}
                  </div>

                  {/* Gig Earnings */}
                  <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-accent" />
                      <span className="text-sm font-semibold text-accent">Earn</span>
                      <span className="ml-auto text-base font-bold text-accent">₹{gig.gigEarning}</span>
                    </div>
                  </div>

                  <Button variant="hero" size="sm" className="w-full gap-2" asChild>
                    <Link to={`/gigs/${gig.id}`}>
                      <Eye className="h-4 w-4" /> View Details
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No gigs match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Opportunities;
