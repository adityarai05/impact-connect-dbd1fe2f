import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Check } from "lucide-react";

const events = [
  { id: 1, title: "Community Clean-Up Day", date: "Mar 15, 2026", time: "9:00 AM – 2:00 PM", location: "Riverside Park", spots: 50, spotsLeft: 12, desc: "Join us for a city-wide park clean-up. Bring gloves and enthusiasm!" },
  { id: 2, title: "Food Drive Collection", date: "Mar 22, 2026", time: "10:00 AM – 4:00 PM", location: "Community Center", spots: 30, spotsLeft: 8, desc: "Help sort and distribute food donations to families in need." },
  { id: 3, title: "Youth Mentoring Workshop", date: "Apr 5, 2026", time: "1:00 PM – 5:00 PM", location: "Lincoln Library", spots: 20, spotsLeft: 5, desc: "Train to become a youth mentor and make a lasting impact on a young person's life." },
  { id: 4, title: "Earth Day Tree Planting", date: "Apr 22, 2026", time: "8:00 AM – 12:00 PM", location: "Greenfield Park", spots: 100, spotsLeft: 34, desc: "Celebrate Earth Day by planting trees and restoring green spaces." },
  { id: 5, title: "Summer Kickoff Fundraiser", date: "May 10, 2026", time: "6:00 PM – 10:00 PM", location: "Grand Hall", spots: 200, spotsLeft: 75, desc: "Join our annual fundraiser gala with live music, food, and community celebration." },
  { id: 6, title: "Back to School Supply Drive", date: "Aug 1, 2026", time: "9:00 AM – 3:00 PM", location: "City Square", spots: 40, spotsLeft: 22, desc: "Help collect and distribute school supplies for underprivileged students." },
];

const Events = () => {
  const [rsvped, setRsvped] = useState<Set<number>>(new Set());

  const handleRsvp = (id: number) => {
    setRsvped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main>
      <section className="gradient-primary py-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Upcoming Events</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Mark your calendar and join us at our upcoming community events.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-secondary">{event.date}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {event.time}</p>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-card-foreground">{event.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{event.desc}</p>
                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {event.spotsLeft} spots left</span>
                </div>
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${((event.spots - event.spotsLeft) / event.spots) * 100}%` }} />
                </div>
                <Button
                  variant={rsvped.has(event.id) ? "accent" : "hero"}
                  size="sm"
                  className="w-full"
                  onClick={() => handleRsvp(event.id)}
                >
                  {rsvped.has(event.id) ? <><Check className="h-4 w-4" /> RSVP'd</> : "RSVP Now"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Events;
