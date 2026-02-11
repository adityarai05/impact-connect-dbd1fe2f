import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Globe } from "lucide-react";

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
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl bg-card p-8 shadow-card"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
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

      {/* Timeline */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">Our Timeline</h2>
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative mb-10 pl-12 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}
              >
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
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card p-6 text-center shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground">
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-card-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-20">
        <div className="container grid gap-6 sm:grid-cols-3">
          {[
            { icon: Users, label: "Volunteers Engaged", value: "500+" },
            { icon: Award, label: "Awards Won", value: "12" },
            { icon: Globe, label: "Countries Active", value: "3" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 rounded-2xl bg-card p-8 text-center shadow-card"
            >
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
