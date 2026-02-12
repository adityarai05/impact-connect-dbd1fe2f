import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Globe, BookOpen, Calendar, MapPin, FileText, Download, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import foodImg from "@/assets/opportunity-food.jpg";
import eduImg from "@/assets/opportunity-education.jpg";
import envImg from "@/assets/opportunity-environment.jpg";
import housingImg from "@/assets/opportunity-housing.jpg";
import heroImage from "@/assets/hero-volunteers.jpg";

const team = [
  { name: "Amara Williams", role: "Executive Director", initials: "AW" },
  { name: "David Kim", role: "Program Manager", initials: "DK" },
  { name: "Elena Rodriguez", role: "Outreach Lead", initials: "ER" },
  { name: "James Okafor", role: "Community Coordinator", initials: "JO" },
];

const timeline = [
  { year: "2018", title: "Founded", desc: "Started with 10 volunteers in a single neighborhood." },
  { year: "2019", title: "First 100 Volunteers", desc: "Expanded to 5 communities and launched our education program." },
  { year: "2021", title: "National Recognition", desc: "Awarded Best Community Impact Organization by NGO Alliance." },
  { year: "2023", title: "Global Reach", desc: "Expanded operations to 3 countries with 500+ active volunteers." },
  { year: "2025", title: "10,000 Lives Impacted", desc: "Reached our milestone of impacting 10,000 lives across all programs." },
];

const programs = [
  {
    title: "Community Food Drive",
    desc: "Weekly food distribution to underserved communities, reaching 2,000+ families monthly.",
    objectives: ["Reduce food insecurity", "Build community solidarity", "Minimize food waste"],
    impact: "Distributed 50,000+ meals across 15 neighborhoods.",
    images: [foodImg, heroImage],
  },
  {
    title: "Youth Education Program",
    desc: "After-school tutoring and mentorship for underprivileged students.",
    objectives: ["Improve academic performance", "Provide career guidance", "Build confidence"],
    impact: "Supported 1,200+ students with a 40% improvement in grades.",
    images: [eduImg, heroImage],
  },
  {
    title: "Green Earth Initiative",
    desc: "Environmental conservation through tree planting, clean-ups, and awareness campaigns.",
    objectives: ["Plant 50,000 trees by 2026", "Reduce plastic waste", "Educate communities on sustainability"],
    impact: "Planted 30,000 trees and organized 150+ clean-up drives.",
    images: [envImg, heroImage],
  },
  {
    title: "Housing Support Program",
    desc: "Building and repairing homes for families in need through volunteer labor.",
    objectives: ["Provide safe housing", "Engage corporate volunteers", "Create lasting community assets"],
    impact: "Built or repaired 200+ homes across 10 cities.",
    images: [housingImg, heroImage],
  },
];

const events = [
  { title: "Annual Volunteer Summit 2025", date: "March 15, 2025", location: "New Delhi", type: "Upcoming", desc: "A gathering of 500+ volunteers to share stories, learn, and plan the year ahead." },
  { title: "World Environment Day Drive", date: "June 5, 2025", location: "Multiple Cities", type: "Upcoming", desc: "Tree planting and clean-up drives across 20 cities simultaneously." },
  { title: "Winter Relief Campaign 2024", date: "December 2024", location: "Northern India", type: "Past", desc: "Distributed warm clothing and blankets to 5,000+ families during the winter season." },
  { title: "Education Marathon 2024", date: "September 2024", location: "Mumbai", type: "Past", desc: "A month-long intensive tutoring drive preparing 300 students for board exams." },
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="gradient-primary py-20">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">About ImpactHands</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Empowering communities through the power of volunteerism since 2018.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container grid gap-8 md:grid-cols-2">
          {[
            { icon: Target, title: "Our Mission", text: "To connect passionate individuals with meaningful volunteer opportunities, creating a world where everyone has the power to make a difference in their community." },
            { icon: Eye, title: "Our Vision", text: "A world where every community thrives through the collective power of volunteerism, compassion, and human connection." },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="rounded-2xl bg-card p-8 shadow-card">
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3"><item.icon className="h-7 w-7 text-primary" /></div>
              <h3 className="mb-3 text-2xl font-bold text-card-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">Our Journey</span>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">Our Story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              ImpactHands began in 2018 when a small group of neighbors realized that by combining their skills and time, they could address the challenges facing their community. What started as weekend clean-up drives and food distribution events quickly grew into a movement that now spans multiple cities and countries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">What We Do</span>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">Our Programs</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {programs.map((program, i) => (
              <motion.div key={program.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="overflow-hidden rounded-2xl bg-card shadow-card">
                <div className="grid grid-cols-2 gap-1">
                  {program.images.map((img, j) => (
                    <img key={j} src={img} alt={`${program.title} ${j + 1}`} className="h-40 w-full object-cover" />
                  ))}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-card-foreground">{program.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{program.desc}</p>
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-bold text-card-foreground">Objectives</h4>
                    <ul className="space-y-1">
                      {program.objectives.map((obj) => (
                        <li key={obj} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-accent/10 p-3">
                    <p className="text-sm font-medium text-accent">📊 Impact: {program.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">Stay Involved</span>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">Events</h2>
          </div>
          <Tabs defaultValue="upcoming" className="mx-auto max-w-3xl">
            <TabsList className="mx-auto mb-8 grid w-full max-w-xs grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            {["upcoming", "past"].map((type) => (
              <TabsContent key={type} value={type} className="space-y-4">
                {events.filter((e) => e.type.toLowerCase() === type).map((event, i) => (
                  <motion.div key={event.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-card p-6 shadow-card">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-card-foreground">{event.title}</h3>
                        <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {event.date}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
                        </div>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${type === "upcoming" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{event.desc}</p>
                  </motion.div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">Our Timeline</h2>
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative mb-10 pl-12 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
                <div className={`absolute left-2.5 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-auto ${i % 2 === 0 ? "md:-right-2" : "md:-left-2"}`} />
                <span className="text-sm font-bold text-secondary">{item.year}</span>
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">Meet Our Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-card p-6 text-center shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground">{member.initials}</div>
                <h3 className="text-lg font-bold text-card-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Financial Disclosure */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">Transparency</span>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">Legal & Financial Disclosure</h2>
          </div>
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Registration Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-card p-8 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3"><Building2 className="h-6 w-6 text-primary" /></div>
                <h3 className="text-xl font-bold text-card-foreground">NGO Registration Details</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Registration Number", value: "NGO/2018/XXXX-XXXX" },
                  { label: "Registration Type", value: "Section 8 Company / Trust" },
                  { label: "PAN Number", value: "AXXXX1234X" },
                  { label: "12A Registration", value: "Registered (Ref: 12A/2019/XXXX)" },
                  { label: "80G Certification", value: "Certified (Ref: 80G/2019/XXXX)" },
                  { label: "FCRA Registration", value: "Applied / Under Process" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-muted/50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <p className="mt-1 font-medium text-card-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Financial Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-card p-8 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3"><FileText className="h-6 w-6 text-primary" /></div>
                <h3 className="text-xl font-bold text-card-foreground">Annual Financial Summary (FY 2024-25)</h3>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-bold text-card-foreground">Income</h4>
                  <div className="space-y-2">
                    {[
                      { source: "Individual Donations", amount: "₹45,00,000" },
                      { source: "Corporate CSR Funds", amount: "₹1,20,00,000" },
                      { source: "Government Grants", amount: "₹35,00,000" },
                      { source: "Events & Fundraisers", amount: "₹15,00,000" },
                    ].map((item) => (
                      <div key={item.source} className="flex justify-between rounded-lg bg-muted/50 px-4 py-2 text-sm">
                        <span className="text-muted-foreground">{item.source}</span>
                        <span className="font-medium text-card-foreground">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-bold text-card-foreground">Expenditure</h4>
                  <div className="space-y-2">
                    {[
                      { category: "Program Delivery", amount: "₹1,20,00,000" },
                      { category: "Operations & Admin", amount: "₹25,00,000" },
                      { category: "Volunteer Support", amount: "₹18,00,000" },
                      { category: "Marketing & Outreach", amount: "₹12,00,000" },
                    ].map((item) => (
                      <div key={item.category} className="flex justify-between rounded-lg bg-muted/50 px-4 py-2 text-sm">
                        <span className="text-muted-foreground">{item.category}</span>
                        <span className="font-medium text-card-foreground">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Downloadable Reports */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-card p-8 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3"><Download className="h-6 w-6 text-primary" /></div>
                <h3 className="text-xl font-bold text-card-foreground">Reports & Documents</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Annual Report 2024-25", type: "PDF" },
                  { title: "Annual Report 2023-24", type: "PDF" },
                  { title: "Audit Report 2024-25", type: "PDF" },
                  { title: "Audit Report 2023-24", type: "PDF" },
                  { title: "Impact Assessment Report", type: "PDF" },
                  { title: "Registration Certificate", type: "PDF" },
                ].map((doc) => (
                  <div key={doc.title} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-muted/50 py-20">
        <div className="container grid gap-6 sm:grid-cols-3">
          {[
            { icon: Users, label: "Volunteers Engaged", value: "500+" },
            { icon: Award, label: "Awards Won", value: "12" },
            { icon: Globe, label: "Countries Active", value: "3" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-2 rounded-2xl bg-card p-8 text-center shadow-card">
              <stat.icon className="h-8 w-8 text-primary" />
              <span className="text-3xl font-extrabold text-primary">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
