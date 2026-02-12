import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Upload } from "lucide-react";

const positions = [
  {
    title: "Program Coordinator",
    location: "New Delhi",
    type: "Full-Time",
    experience: "2-4 years",
    description: "Coordinate volunteer programs, manage community partnerships, and drive on-ground impact. You'll work closely with our field teams to ensure program objectives are met.",
    qualifications: ["Bachelor's degree in Social Work, Management, or related field", "Experience in community development or NGO sector", "Strong communication and organizational skills", "Willingness to travel within assigned region"],
  },
  {
    title: "Communications Manager",
    location: "Mumbai",
    type: "Full-Time",
    experience: "3-5 years",
    description: "Lead our communications strategy, manage social media channels, create compelling content that showcases our impact, and engage with media partners.",
    qualifications: ["Degree in Communications, Journalism, or Marketing", "Experience in nonprofit communications or PR", "Excellent writing and storytelling skills", "Proficiency in design tools and social media platforms"],
  },
  {
    title: "Fundraising Associate",
    location: "Remote",
    type: "Full-Time",
    experience: "1-3 years",
    description: "Support donor engagement, manage fundraising campaigns, prepare grant applications, and maintain relationships with institutional and individual donors.",
    qualifications: ["Experience in fundraising, sales, or business development", "Strong interpersonal and presentation skills", "Familiarity with CRM tools", "Passion for social impact"],
  },
  {
    title: "Field Operations Lead",
    location: "Bangalore",
    type: "Full-Time",
    experience: "4-6 years",
    description: "Oversee field operations across the southern region, manage volunteer deployment, ensure quality of programs, and report on impact metrics.",
    qualifications: ["Significant experience in field operations or project management", "Leadership and team management skills", "Data-driven approach to program evaluation", "Valid driver's license and willingness to travel extensively"],
  },
];

const Careers = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [applyingFor, setApplyingFor] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  return (
    <main>
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Careers</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Join our team and make a career out of making a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground">Open Positions</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {positions.map((pos, i) => (
              <motion.div key={pos.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="overflow-hidden rounded-2xl bg-card shadow-card">
                <button onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} className="flex w-full items-center justify-between p-6 text-left">
                  <div>
                    <h3 className="text-lg font-bold text-card-foreground">{pos.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {pos.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {pos.type}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {pos.experience}</span>
                    </div>
                  </div>
                  {expandedIdx === i ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                </button>
                {expandedIdx === i && (
                  <div className="border-t border-border px-6 pb-6 pt-4">
                    <p className="mb-4 text-muted-foreground">{pos.description}</p>
                    <h4 className="mb-2 font-bold text-card-foreground">Qualifications</h4>
                    <ul className="mb-6 space-y-1">
                      {pos.qualifications.map((q) => (
                        <li key={q} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                          {q}
                        </li>
                      ))}
                    </ul>
                    <Button variant="hero" size="sm" onClick={() => { setApplyingFor(pos.title); document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" }); }}>
                      Apply for this Role
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-3xl font-extrabold text-foreground">Apply Now</h2>
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
                  <Label>Position</Label>
                  <Select value={applyingFor?.toLowerCase() || ""}>
                    <SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger>
                    <SelectContent>
                      {positions.map((p) => (
                        <SelectItem key={p.title} value={p.title.toLowerCase()}>{p.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" placeholder="e.g. 3 years" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Resume Upload</Label>
                <div className="flex items-center gap-3 rounded-lg border border-input bg-background px-4 py-3">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <input id="resume" type="file" accept=".pdf,.doc,.docx" className="text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea id="coverLetter" placeholder="Why are you interested in this role?" rows={5} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">Submit Application</Button>
            </form>
          </div>
        </div>
      </section>

      <ConfirmationDialog open={showConfirm} onClose={() => setShowConfirm(false)} title="Application Submitted!" message="Thank you for applying! Our HR team will review your application and contact you within 7 business days." />
    </main>
  );
};

export default Careers;
