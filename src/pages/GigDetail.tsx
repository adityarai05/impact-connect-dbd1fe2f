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
import { allGigs } from "@/data/gigs";
import gigHeroImg from "@/assets/gig-hero.jpg";
import {
  MapPin, Calendar, Clock, DollarSign, Users, ArrowLeft,
  CheckCircle, Loader2, Send, Award, Briefcase, Target,
  ChevronRight, Shield, Star
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const GigDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const gig = allGigs.find((g) => g.id === Number(id));

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
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
            skills: data.skills?.join(", ") || "",
          }));
        }
      });
    }
  }, [user]);

  if (!gig) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Gig not found.</p>
        <Button asChild variant="outline"><Link to="/opportunities">Back to Opportunities</Link></Button>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("gig_enrollments").insert({
      user_id: user.id,
      gig_id: gig.id,
      gig_title: gig.title,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      skills: form.skills,
      availability: form.availability,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setShowConfirm(true);
    }
  };

  const enrollmentSteps = [
    { num: 1, label: "Review Details", desc: "Read all gig information above" },
    { num: 2, label: "Confirm Availability", desc: "Ensure you can commit to the schedule" },
    { num: 3, label: "Verify Profile", desc: "Check your pre-filled details below" },
    { num: 4, label: "Submit Registration", desc: "Complete and submit the form" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={gig.image || gigHeroImg} alt={gig.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
        <div className="container relative z-10 flex h-full flex-col justify-end pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate("/opportunities")} className="mb-4 flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Opportunities
            </button>
            <span className="mb-2 inline-block rounded-full bg-secondary px-4 py-1 text-xs font-bold text-secondary-foreground">{gig.cause}</span>
            <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">{gig.title}</h1>
            <p className="mt-2 max-w-xl text-lg text-primary-foreground/80">{gig.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Strip */}
      <section className="border-b border-border bg-card">
        <div className="container">
          <div className="flex flex-wrap items-center gap-6 py-4 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {gig.location}</span>
            <span className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4 text-primary" /> {gig.date}</span>
            <span className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 text-primary" /> {gig.time}</span>
            <span className="flex items-center gap-2 font-semibold text-accent"><DollarSign className="h-4 w-4" /> ₹{gig.gigEarning}</span>
            <span className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4 text-primary" /> {gig.slotsAvailable} slots available</span>
          </div>
        </div>
      </section>

      {/* About This Gig */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="mb-6 text-2xl font-extrabold text-foreground md:text-3xl">About This Gig</h2>
            <p className="mb-8 text-muted-foreground leading-relaxed">{gig.fullDescription}</p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-muted/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground"><Target className="h-5 w-5 text-primary" /> Responsibilities</h3>
                <ul className="space-y-2">
                  {gig.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {r}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-muted/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground"><Briefcase className="h-5 w-5 text-primary" /> Skills Required</h3>
                <div className="mb-6 flex flex-wrap gap-2">
                  {gig.skills.map((s) => (
                    <span key={s} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{s}</span>
                  ))}
                </div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground"><Shield className="h-5 w-5 text-primary" /> Who Can Apply</h3>
                <ul className="space-y-2">
                  {gig.whoCanApply.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground"><Star className="h-5 w-5 text-accent" /> What You'll Gain</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {gig.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><Award className="h-4 w-4 text-accent" /> {b}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="container max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="mb-8 text-center text-2xl font-extrabold text-foreground md:text-3xl">Event Highlights & Impact</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {gig.impactMetrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-card p-6 text-center shadow-card"
                >
                  <p className="text-3xl font-extrabold text-primary">{m.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="mb-8 text-center text-2xl font-extrabold text-foreground md:text-3xl">How to Enroll</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {enrollmentSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-card p-5 shadow-card text-center"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{step.num}</div>
                  <h4 className="mb-1 font-bold text-card-foreground">{step.label}</h4>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container max-w-2xl">
          <motion.div {...fadeUp}>
            <h2 className="mb-2 text-center text-2xl font-extrabold text-foreground md:text-3xl">Register for this Gig</h2>
            <p className="mb-8 text-center text-muted-foreground">
              Earn <span className="font-bold text-accent">₹{gig.gigEarning}</span> by completing this gig
            </p>

            {!user ? (
              <div className="rounded-2xl bg-card p-8 text-center shadow-card">
                <p className="mb-4 text-lg text-muted-foreground">Please login to enroll in this gig.</p>
                <Button variant="hero" asChild><Link to="/auth">Login / Sign Up</Link></Button>
              </div>
            ) : (
              <div className="rounded-2xl bg-card p-8 shadow-card">
                <div className="mb-6 rounded-lg bg-accent/10 border border-accent/20 p-4 text-center">
                  <p className="text-sm text-accent font-medium">✅ Please confirm your details before enrolling.</p>
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
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <Input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="e.g. Teaching, Cooking" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <Textarea value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} rows={2} placeholder="e.g. Weekends, Full day" />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Confirm & Enroll
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <ConfirmationDialog
        open={showConfirm}
        onClose={() => { setShowConfirm(false); navigate("/opportunities"); }}
        title="Enrollment Successful!"
        message={`You've been enrolled for "${gig.title}". We'll send confirmation details to your email.`}
      />
    </main>
  );
};

export default GigDetail;
