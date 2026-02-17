import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Search, Filter, X, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { allEvents, eventCategories } from "@/data/events";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = allEvents.filter((event) => {
    const matchCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main>
      <section className="gradient-primary py-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Upcoming Events</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Discover events near you and make a lasting impact in your community.
            </p>
          </motion.div>
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
                placeholder="Search events by title or location..."
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
                {eventCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="mb-4 text-sm text-muted-foreground">{filtered.length} events found</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                {/* Event Image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{event.category}</span>
                </div>

                <div className="p-5">
                  <h3 className="mb-2 text-xl font-bold text-card-foreground">{event.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">{event.desc}</p>
                  <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-primary" /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-primary" /> {event.location}</span>
                  </div>
                  <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {event.time}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {event.spotsLeft} spots left</span>
                  </div>
                  <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${((event.spots - event.spotsLeft) / event.spots) * 100}%` }} />
                  </div>
                  <Button variant="hero" size="sm" className="w-full gap-2" asChild>
                    <Link to={`/events/${event.id}`}>
                      <Eye className="h-4 w-4" /> View Details
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No events match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Events;
