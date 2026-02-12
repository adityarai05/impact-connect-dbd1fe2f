import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Building2, GraduationCap, Handshake, Globe, CheckCircle, ArrowRight } from "lucide-react";

const partnerTypes = [
  { icon: Building2, title: "Corporate Partnership", desc: "Engage employees in CSR activities and community impact programs." },
  { icon: Handshake, title: "NGO Collaboration", desc: "Joint programs, resource sharing, and amplified impact through collaboration." },
  { icon: Globe, title: "CSR Initiatives", desc: "Design and implement customized CSR programs aligned with your goals." },
  { icon: GraduationCap, title: "Educational Institutions", desc: "Student volunteering programs, internships, and research partnerships." },
];

const benefits = [
  "Brand visibility and positive social impact association",
  "Employee engagement and team-building opportunities",
  "Customized CSR reports and impact documentation",
  "Tax benefits under applicable sections",
  "Access to our volunteer network and community reach",
  "Joint media coverage and PR opportunities",
];

const process = [
  { step: "1", title: "Reach Out", desc: "Submit your partnership inquiry through our form." },
  { step: "2", title: "Consultation", desc: "We discuss your goals and design a tailored partnership plan." },
  { step: "3", title: "Agreement", desc: "Formalize the partnership with clear deliverables and timelines." },
  { step: "4", title: "Execution", desc: "Launch programs together and measure impact regularly." },
];

const PartnerWithUs = () => {
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
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Partner With Us</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Together, we can create a bigger impact. Explore partnership opportunities with ImpactHands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground">Types of Partnerships</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((pt, i) => (
              <motion.div key={pt.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-card p-6 shadow-card text-center transition-all hover:shadow-card-hover hover:-translate-y-1">
                <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <pt.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-card-foreground">{pt.title}</h3>
                <p className="text-sm text-muted-foreground">{pt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground">Benefits of Partnership</h2>
          <div className="mx-auto max-w-2xl grid gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-card">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <p className="text-sm text-muted-foreground">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground">How It Works</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-xl font-bold text-primary-foreground">{p.step}</div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                {i < process.length - 1 && <ArrowRight className="mx-auto mt-4 hidden h-5 w-5 text-muted-foreground lg:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-3xl font-extrabold text-foreground">Partnership Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-card p-8 shadow-card">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" placeholder="Your organization" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person</Label>
                  <Input id="contactName" placeholder="Full name" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@org.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Partnership Type</Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {["Corporate", "NGO Collaboration", "CSR Initiative", "Educational Institution", "Other"].map((t) => (
                      <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposal">Proposal / Message</Label>
                <Textarea id="proposal" placeholder="Tell us about your partnership goals..." rows={5} required />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">Submit Inquiry</Button>
            </form>
          </div>
        </div>
      </section>

      <ConfirmationDialog open={showConfirm} onClose={() => setShowConfirm(false)} title="Inquiry Received!" message="Thank you for your interest in partnering with us. Our team will review your proposal and respond within 3-5 business days." />
    </main>
  );
};

export default PartnerWithUs;
