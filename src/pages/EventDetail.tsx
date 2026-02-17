import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { allEvents } from "@/data/events";
import eventHeroImg from "@/assets/event-hero.jpg";
import {
  MapPin, Calendar, Clock, Users, ArrowLeft,
  CheckCircle, Loader2, Send, Award, Target,
  ChevronRight, Shield, Star, ListChecks, FileText
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const event = allEvents.find((e) => e.id === Number(id));

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, email: user.email || "" }));
      supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => {
        if (data) {
          setForm((prev) => ({
            ...prev,
            full_name: data.full_name || "",
            phone: data.phone || "",
          }));
        }
      });
    }
  }, [user]);

  if (!event) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Event not found.</p>
        <Button asChild variant="outline"><Link to="/events">Back to Events</Link></Button>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("event_enrollments").insert({
      user_id: user.id,
      event_id: event.id,
      event_title: event.title,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setShowConfirm(true);
    }
  };

  const spotsPercent = ((event.spots - event.spotsLeft) / event.spots) * 100;

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={event.image || eventHeroImg} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
        <div className="container relative z-10 flex h-full flex-col justify-end pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate("/events")} className="mb-4 flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Events
            </button>
            <span className="mb-2 inline-block rounded-full bg-secondary px-4 py-1 text-xs font-bold text-secondary-foreground">{event.category}</span>
            <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">{event.title}</h1>
            <p className="mt-2 max-w-xl text-lg text-primary-foreground/80">{event.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="border-b border-border bg-card">
        <div className="container">
          <div className="flex flex-wrap items-center gap-6 py-4 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {event.location}</span>
            <span className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4 text-primary" /> {event.date}</span>
            <span className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 text-primary" /> {event.time}</span>
            <span className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4 text-primary" /> {event.spotsLeft} of {event.spots} spots left</span>
          </div>
          <div className="pb-4">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${spotsPercent}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* About the Event */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="mb-6 text-2xl font-extrabold text-foreground md:text-3xl">About the Event</h2>
            <p className="mb-8 text-muted-foreground leading-relaxed">{event.fullDescription}</p>

            {/* Agenda */}
            <div className="mb-8 rounded-2xl bg-muted/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground"><ListChecks className="h-5 w-5 text-primary" /> Agenda / Schedule</h3>
              <div className="space-y-3">
                {event.agenda.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Impact */}
            <div className="mb-8 rounded-2xl bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground"><Target className="h-5 w-5 text-accent" /> Expected Impact</h3>
              <p className="text-muted-foreground">{event.expectedImpact}</p>
            </div>

            {/* Organizer */}
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Organized by:</span> {event.organizer}</p>
          </motion.div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="container max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="mb-8 text-center text-2xl font-extrabold text-foreground md:text-3xl">Volunteer Roles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {event.roles.map((role, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-card p-6 shadow-card"
                >
                  <h3 className="mb-3 text-lg font-bold text-card-foreground">{role.title}</h3>
                  <h4 className="mb-2 text-sm font-semibold text-primary">Responsibilities</h4>
                  <ul className="mb-4 space-y-1.5">
                    {role.responsibilities.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> {r}</li>
                    ))}
                  </ul>
                  <h4 className="mb-2 text-sm font-semibold text-primary">Requirements</h4>
                  <ul className="space-y-1.5">
                    {role.requirements.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground"><ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" /> {r}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="mt-8 rounded-2xl bg-card p-6 shadow-card">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-card-foreground"><Star className="h-5 w-5 text-accent" /> Benefits</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {event.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><Award className="h-4 w-4 text-accent" /> {b}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Enroll */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="mb-8 text-center text-2xl font-extrabold text-foreground md:text-3xl">How to Enroll</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-muted/50 p-6">
                <h3 className="mb-3 flex items-center gap-2 font-bold text-foreground"><Shield className="h-5 w-5 text-primary" /> Who Can Join</h3>
                <ul className="space-y-2">
                  {event.howToEnroll.whoCanJoin.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {w}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-muted/50 p-6">
                <h3 className="mb-3 flex items-center gap-2 font-bold text-foreground"><FileText className="h-5 w-5 text-primary" /> Documents Required</h3>
                <ul className="mb-4 space-y-2">
                  {event.howToEnroll.documents.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> {d}</li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Time Commitment:</span> {event.howToEnroll.timeCommitment}</p>
                <p className="mt-2 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Selection:</span> {event.howToEnroll.selectionProcess}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container max-w-2xl">
          <motion.div {...fadeUp}>
            <h2 className="mb-2 text-center text-2xl font-extrabold text-foreground md:text-3xl">Register for this Event</h2>
            <p className="mb-8 text-center text-muted-foreground">{event.spotsLeft} spots remaining</p>

            {!user ? (
              <div className="rounded-2xl bg-card p-8 text-center shadow-card">
                <p className="mb-4 text-lg text-muted-foreground">Please login to register for this event.</p>
                <Button variant="hero" asChild><Link to="/auth">Login / Sign Up</Link></Button>
              </div>
            ) : (
              <div className="rounded-2xl bg-card p-8 shadow-card">
                <div className="mb-6 rounded-lg bg-accent/10 border border-accent/20 p-4 text-center">
                  <p className="text-sm text-accent font-medium">✅ Please confirm your details before registering.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Message (Optional)</Label>
                    <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={2} placeholder="Any questions or special requirements?" />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Confirm & Register
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <ConfirmationDialog
        open={showConfirm}
        onClose={() => { setShowConfirm(false); navigate("/events"); }}
        title="Registration Successful!"
        message={`You've been registered for "${event.title}". We'll send confirmation details to your email.`}
      />
    </main>
  );
};

export default EventDetail;
