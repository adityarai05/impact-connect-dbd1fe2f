import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import foodImg from "@/assets/opportunity-food.jpg";
import eduImg from "@/assets/opportunity-education.jpg";
import envImg from "@/assets/opportunity-environment.jpg";
import housingImg from "@/assets/opportunity-housing.jpg";

const posts = [
  { id: 1, title: "How Volunteering Changed My Life: A Personal Story", excerpt: "One volunteer shares their transformative journey from hesitant newcomer to passionate community leader.", category: "Stories", date: "Feb 10, 2026", author: "Sarah Johnson", image: foodImg, featured: true },
  { id: 2, title: "5 Ways to Get Your Company Involved in Volunteering", excerpt: "Corporate volunteering is growing fast. Here's how to bring meaningful programs to your workplace.", category: "Tips", date: "Feb 5, 2026", author: "Marcus Chen", image: eduImg },
  { id: 3, title: "Our Environmental Impact: 2025 Annual Report", excerpt: "We planted 2,000 trees and cleaned up 50 miles of waterways this year. Here are the full results.", category: "Impact", date: "Jan 28, 2026", author: "Elena Rodriguez", image: envImg },
  { id: 4, title: "Building Homes, Building Hope", excerpt: "The story behind our most ambitious housing project and the families it transformed.", category: "Stories", date: "Jan 20, 2026", author: "James Okafor", image: housingImg },
  { id: 5, title: "Volunteer Spotlight: Youth Mentoring Program", excerpt: "Meet the mentors making a difference in the lives of at-risk youth across our communities.", category: "Spotlight", date: "Jan 15, 2026", author: "Priya Patel", image: eduImg },
  { id: 6, title: "The Science Behind Why Volunteering Makes You Happier", excerpt: "Research shows that giving your time boosts mental health, builds resilience, and strengthens communities.", category: "Tips", date: "Jan 8, 2026", author: "David Kim", image: foodImg },
];

const categories = ["All", "Stories", "Tips", "Impact", "Spotlight"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = selectedCategory === "All" ? posts : posts.filter((p) => p.category === selectedCategory);
  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || selectedCategory !== "All");

  return (
    <main>
      <section className="gradient-primary py-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Impact Stories & Blog</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
              Read stories of impact, tips for volunteering, and updates from our community.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {/* Category filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && selectedCategory === "All" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 grid overflow-hidden rounded-2xl bg-card shadow-card md:grid-cols-2"
            >
              <div className="h-64 md:h-auto">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8">
                <span className="mb-2 inline-block w-fit rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">{featured.category}</span>
                <h2 className="mb-3 text-2xl font-bold text-card-foreground">{featured.title}</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                </div>
                <Button variant="hero" size="default" className="w-fit">
                  Read More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Posts grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <span className="mb-2 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">{post.category}</span>
                  <h3 className="mb-2 text-lg font-bold text-card-foreground leading-tight">{post.title}</h3>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
