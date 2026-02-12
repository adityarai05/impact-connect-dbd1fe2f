import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { GraduationCap, Clock, Award, BookOpen, Target, CheckCircle } from "lucide-react";

const domains = [
  { icon: BookOpen, title: "Content & Communications", desc: "Blog writing, social media management, and storytelling." },
  { icon: Target, title: "Program Management", desc: "Assist in planning, executing, and evaluating volunteer programs." },
  { icon: GraduationCap, title: "Research & Policy", desc: "Social impact research, data analysis, and policy recommendations." },
  { title: "Design & Media", desc: "Graphic design, video editing, and creative content production.", icon: Award },
  { title: "Technology & Development", desc: "Web development, app support, and database management.", icon: Clock },
  { title: "Fundraising & Partnerships", desc: "Donor outreach, grant writing, and partnership development.", icon: CheckCircle },
];

const durations = [
  { label: "Summer Internship", period: "2-3 months (May - July)" },
  { label: "Winter Internship", period: "1-2 months (Dec - Jan)" },
  { label: "Semester Internship", period: "4-6 months (flexible)" },
  { label: "Virtual Internship", period: "Flexible duration, remote" },
];

const outcomes = [
  "Hands-on experience in the social sector",
  "Mentorship from experienced professionals",
  "Certificate of completion from ImpactHands",
  "Letter of recommendation for top performers",
  "Portfolio-worthy project work",
  "Networking with NGO professionals and volunteers",
];

const Internships = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  return (
    <main>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Internships</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Gain real-world experience while creating social impact. Explore internship opportunities across multiple domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground">Internship Domains</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <d.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-card-foreground">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Duration & Outcomes */}
      <section className="bg-muted/50 py-20">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-extrabold text-foreground">Duration Options</h2>
            <div className="space-y-4">
              {durations.map((d) => (
                <div key={d.label} className="rounded-xl bg-card p-4 shadow-card">
                  <p className="font-bold text-card-foreground">{d.label}</p>
                  <p className="text-sm text-muted-foreground">{d.period}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-extrabold text-foreground">Learning Outcomes</h2>
            <div className="space-y-3">
              {outcomes.map((o) => (
                <div key={o} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-card">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <p className="text-sm text-muted-foreground">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-20">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl rounded-2xl bg-card p-10 shadow-card">
            <Award className="mx-auto mb-4 h-12 w-12 text-secondary" />
            <h2 className="mb-3 text-2xl font-extrabold text-foreground">Certification</h2>
            <p className="text-muted-foreground">All interns who successfully complete their internship receive an official Certificate of Completion from ImpactHands, recognized across the social sector. Outstanding interns also receive a detailed Letter of Recommendation.</p>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-3xl font-extrabold text-foreground">Apply for Internship</h2>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-card p-8 shadow-card">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College / University</Label>
                  <Input id="college" placeholder="Your institution" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="course">Course / Degree</Label>
                  <Input id="course" placeholder="e.g. B.A. Social Work" required />
                </div>
                <div className="space-y-2">
                  <Label>Domain</Label>
                  <Select required>
                    <SelectTrigger><SelectValue placeholder="Select domain" /></SelectTrigger>
                    <SelectContent>
                      {domains.map((d) => (
                        <SelectItem key={d.title} value={d.title.toLowerCase()}>{d.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preferred Duration</Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                  <SelectContent>
                    {durations.map((d) => (
                      <SelectItem key={d.label} value={d.label.toLowerCase()}>{d.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to intern with us?</Label>
                <Textarea id="motivation" placeholder="Share your motivation..." rows={4} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">Submit Application</Button>
            </form>
          </div>
        </div>
      </section>

      <ConfirmationDialog open={showConfirm} onClose={() => setShowConfirm(false)} title="Application Submitted!" message="Thank you for your interest in interning with us! We'll review your application and reach out within 5 business days." />
    </main>
  );
};

export default Internships;
