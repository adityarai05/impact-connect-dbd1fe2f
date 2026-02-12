import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Users, Award, Clock, Heart, Shield, Lightbulb } from "lucide-react";

const roles = [
  { title: "Community Organizer", desc: "Lead local initiatives and coordinate volunteer groups." },
  { title: "Event Volunteer", desc: "Help organize and run community events and drives." },
  { title: "Mentor / Tutor", desc: "Guide students and youth through educational programs." },
  { title: "Field Worker", desc: "Participate in on-ground relief and development work." },
  { title: "Digital Volunteer", desc: "Contribute remotely through content, design, or tech support." },
];

const benefits = [
  { icon: Award, title: "Certificate of Volunteering", desc: "Receive official recognition for your contributions." },
  { icon: Users, title: "Network & Community", desc: "Connect with like-minded changemakers." },
  { icon: Lightbulb, title: "Skill Development", desc: "Develop leadership, communication, and project management skills." },
  { icon: Heart, title: "Make Real Impact", desc: "See the direct results of your efforts in communities." },
  { icon: Shield, title: "Letter of Recommendation", desc: "Top performers receive personalized recommendations." },
  { icon: Clock, title: "Flexible Schedules", desc: "Choose durations that fit your availability." },
];

const JoinVolunteer = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Join as a Volunteer</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Your time and skills can transform lives. Find the perfect role and start making an impact today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground">Available Roles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, i) => (
              <motion.div key={role.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1">
                <h3 className="mb-2 text-lg font-bold text-card-foreground">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Duration */}
      <section className="bg-muted/50 py-20">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-extrabold text-foreground">Skills We Value</h2>
            <ul className="space-y-3">
              {["Communication & Empathy", "Team Leadership", "Teaching & Mentoring", "Event Management", "Content Writing & Design", "Technical / IT Skills", "First Aid & Healthcare"].map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-extrabold text-foreground">Duration Options</h2>
            <div className="space-y-4">
              {[
                { label: "Weekend Volunteer", duration: "1-2 days" },
                { label: "Short-Term", duration: "1-4 weeks" },
                { label: "Long-Term", duration: "1-6 months" },
                { label: "Ongoing", duration: "Open-ended commitment" },
              ].map((d) => (
                <div key={d.label} className="rounded-xl bg-card p-4 shadow-card">
                  <p className="font-bold text-card-foreground">{d.label}</p>
                  <p className="text-sm text-muted-foreground">{d.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground">Benefits of Volunteering</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-4 rounded-2xl bg-card p-6 shadow-card">
                <div className="flex-shrink-0 rounded-xl bg-primary/10 p-3 self-start">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-3xl font-extrabold text-foreground">Apply Now</h2>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-card p-8 shadow-card">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Interest Area</Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select an area" /></SelectTrigger>
                  <SelectContent>
                    {["Education", "Healthcare", "Environment", "Food & Hunger", "Housing", "Digital / Remote"].map((area) => (
                      <SelectItem key={area} value={area.toLowerCase()}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Why do you want to volunteer?</Label>
                <Textarea id="message" placeholder="Tell us about your motivation..." rows={4} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">Submit Application</Button>
            </form>
          </div>
        </div>
      </section>

      <ConfirmationDialog open={showConfirm} onClose={() => setShowConfirm(false)} title="Application Submitted!" message="Thank you for your interest in volunteering! We'll review your application and get back to you within 48 hours." />
    </main>
  );
};

export default JoinVolunteer;
