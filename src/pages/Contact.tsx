import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I sign up to volunteer?", a: "Simply create a free account on our platform, browse available opportunities, and click 'Apply Now' on any that interest you. We'll take it from there!" },
  { q: "Do I need any special skills?", a: "Not at all! We have opportunities for every skill level. Many roles just require enthusiasm and a willingness to help." },
  { q: "Can I volunteer remotely?", a: "Yes! We offer many online volunteering opportunities including tutoring, mentoring, and administrative support." },
  { q: "How are donations used?", a: "75% goes directly to programs and services, 15% to operations, and 10% to fundraising. We publish annual transparency reports." },
  { q: "Can companies partner with ImpactHands?", a: "Absolutely! We have a corporate volunteering program. Contact us to discuss partnership opportunities." },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would integrate with backend
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main>
      <section className="gradient-primary py-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Get in Touch</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Contact info */}
            <div className="space-y-6 lg:col-span-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Contact Information</h2>
                <p className="text-muted-foreground">Reach out to us through any of these channels.</p>
              </div>
              {[
                { icon: Mail, label: "Email", value: "hello@impacthands.org" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: MapPin, label: "Address", value: "123 Community Lane, Cityville, ST 12345" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-card p-8 shadow-card lg:col-span-3"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium text-foreground">Subject</label>
                <input required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium text-foreground">Message</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <Button variant="hero" size="lg" type="submit" className="mt-6 w-full">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-foreground">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
