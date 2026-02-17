import foodImg from "@/assets/opportunity-food.jpg";
import eduImg from "@/assets/opportunity-education.jpg";
import envImg from "@/assets/opportunity-environment.jpg";
import housingImg from "@/assets/opportunity-housing.jpg";

export interface Gig {
  id: number;
  title: string;
  tagline: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  cause: string;
  type: string;
  skill: string;
  skills: string[];
  image: string;
  desc: string;
  fullDescription: string;
  responsibilities: string[];
  whoCanApply: string[];
  benefits: string[];
  gigEarning: number;
  slotsAvailable: number;
  impactMetrics: { label: string; value: string }[];
}

export const allGigs: Gig[] = [
  {
    id: 1,
    title: "Community Food Drive",
    tagline: "Help feed families and earn while making a difference",
    location: "Downtown Center",
    date: "Mar 20, 2026",
    time: "9:00 AM – 1:00 PM",
    duration: "4 hours",
    cause: "Hunger Relief",
    type: "In-person",
    skill: "General",
    skills: ["Logistics", "Communication", "Teamwork"],
    image: foodImg,
    desc: "Help collect and distribute food packages to families in need across the downtown area.",
    fullDescription: "Join our community food drive where volunteers coordinate the collection, sorting, and distribution of food packages to over 200 families in need. You'll work alongside experienced coordinators to manage inventory, organize distribution points, and ensure every family receives nutritious meals.",
    responsibilities: ["Coordinate food collection logistics", "Sort and categorize donated items", "Manage inventory tracking", "Distribute packages to families", "Maintain cleanliness and safety standards"],
    whoCanApply: ["Age 18+", "No prior experience required", "Able to lift up to 20 lbs", "Comfortable working outdoors"],
    benefits: ["Certificate of Volunteering", "Networking with community leaders", "Hands-on logistics experience", "Free meals during the event"],
    gigEarning: 500,
    slotsAvailable: 15,
    impactMetrics: [
      { label: "Meals Served", value: "500+" },
      { label: "Families Helped", value: "200+" },
      { label: "Volunteers Engaged", value: "50+" },
    ],
  },
  {
    id: 2,
    title: "Youth Education Program",
    tagline: "Shape young minds and earn through mentoring",
    location: "Lincoln School",
    date: "Mar 25, 2026",
    time: "2:00 PM – 5:00 PM",
    duration: "3 hours/week",
    cause: "Education",
    type: "In-person",
    skill: "Teaching",
    skills: ["Teaching", "Mentoring", "Patience", "Communication"],
    image: eduImg,
    desc: "Tutor and mentor young students in reading, math, and life skills.",
    fullDescription: "Make a lasting impact on the lives of underprivileged youth by providing personalized tutoring sessions in core subjects. Our program pairs volunteers with small groups of students who need extra academic support, creating meaningful connections that go beyond the classroom.",
    responsibilities: ["Lead tutoring sessions in reading and math", "Create engaging learning materials", "Track student progress", "Provide mentorship and encouragement", "Communicate with program coordinators"],
    whoCanApply: ["Background in education preferred", "Passion for teaching", "Background check required", "Minimum 4-week commitment"],
    benefits: ["Teaching certificate", "Professional development", "Reference letter", "Networking with educators"],
    gigEarning: 800,
    slotsAvailable: 10,
    impactMetrics: [
      { label: "Students Supported", value: "200+" },
      { label: "Tutoring Hours", value: "1000+" },
      { label: "Grade Improvement", value: "85%" },
    ],
  },
  {
    id: 3,
    title: "Park Restoration Project",
    tagline: "Restore nature and earn through environmental action",
    location: "Greenfield Park",
    date: "Apr 5, 2026",
    time: "8:00 AM – 4:00 PM",
    duration: "Full day",
    cause: "Environment",
    type: "In-person",
    skill: "General",
    skills: ["Physical Fitness", "Teamwork", "Environmental Awareness"],
    image: envImg,
    desc: "Help restore the local park by planting trees and cleaning up the area.",
    fullDescription: "Be part of our ambitious park restoration initiative! Volunteers will plant native trees and shrubs, remove invasive species, clean waterways, and install new community garden beds. This full-day event transforms urban green spaces into thriving ecosystems for everyone to enjoy.",
    responsibilities: ["Plant native trees and shrubs", "Remove invasive plant species", "Clean park waterways and trails", "Install garden beds", "Document restoration progress"],
    whoCanApply: ["Age 16+ (minors with guardian)", "Comfortable with outdoor physical work", "No experience needed", "Bring water and sunscreen"],
    benefits: ["Environmental stewardship certificate", "Community service hours", "Free lunch and refreshments", "Tree planting certificate"],
    gigEarning: 600,
    slotsAvailable: 25,
    impactMetrics: [
      { label: "Trees Planted", value: "300+" },
      { label: "Area Restored", value: "5 acres" },
      { label: "Waste Collected", value: "2 tons" },
    ],
  },
  {
    id: 4,
    title: "Housing Build Weekend",
    tagline: "Build homes, build futures, earn while you help",
    location: "Eastside District",
    date: "Apr 12-13, 2026",
    time: "7:00 AM – 5:00 PM",
    duration: "2 days",
    cause: "Housing",
    type: "In-person",
    skill: "Construction",
    skills: ["Construction", "Carpentry", "Physical Fitness", "Safety"],
    image: housingImg,
    desc: "Build safe and affordable housing for families who need it most.",
    fullDescription: "Join our housing build weekend to construct safe, affordable homes for families transitioning out of homelessness. Work alongside professional contractors to frame walls, install roofing, and create the foundation of a family's future. No prior construction experience needed – our team leaders will guide you every step.",
    responsibilities: ["Assist with framing and construction", "Follow safety protocols", "Transport building materials", "Quality check completed sections", "Support team coordination"],
    whoCanApply: ["Age 18+", "Physically able to perform construction tasks", "Steel-toed boots required", "Willing to work in all weather conditions"],
    benefits: ["Construction skills training", "Professional certification", "Networking with contractors", "Meals and transportation provided"],
    gigEarning: 1200,
    slotsAvailable: 20,
    impactMetrics: [
      { label: "Homes Built", value: "50+" },
      { label: "Families Housed", value: "50+" },
      { label: "Volunteer Hours", value: "5000+" },
    ],
  },
  {
    id: 5,
    title: "Online Tutoring",
    tagline: "Teach from home and earn per session",
    location: "Remote",
    date: "Ongoing",
    time: "Flexible",
    duration: "2 hours/week",
    cause: "Education",
    type: "Online",
    skill: "Teaching",
    skills: ["Teaching", "Technology", "Communication"],
    image: eduImg,
    desc: "Provide virtual tutoring sessions to students from underserved communities.",
    fullDescription: "Use your knowledge to empower students from underserved communities through virtual one-on-one tutoring sessions. Our online platform connects you with students who need help in math, science, and language arts. Enjoy flexible scheduling that fits around your life.",
    responsibilities: ["Conduct online tutoring sessions", "Prepare lesson materials", "Track student progress", "Provide feedback to coordinators"],
    whoCanApply: ["Strong internet connection required", "Teaching experience preferred", "Background check required", "Available for minimum 2 hours/week"],
    benefits: ["Flexible schedule", "Remote work", "Teaching portfolio", "Stipend per session"],
    gigEarning: 400,
    slotsAvailable: 30,
    impactMetrics: [
      { label: "Students Reached", value: "500+" },
      { label: "Sessions Completed", value: "2000+" },
      { label: "Pass Rate", value: "92%" },
    ],
  },
  {
    id: 6,
    title: "Meal Preparation",
    tagline: "Cook for the community and earn in the kitchen",
    location: "Community Kitchen",
    date: "Mar 28, 2026",
    time: "6:00 AM – 11:00 AM",
    duration: "5 hours",
    cause: "Hunger Relief",
    type: "In-person",
    skill: "Cooking",
    skills: ["Cooking", "Food Safety", "Teamwork", "Organization"],
    image: foodImg,
    desc: "Cook and prepare nutritious meals for community distribution events.",
    fullDescription: "Step into our community kitchen and help prepare hundreds of nutritious meals for distribution to shelters, senior centers, and food-insecure families. You'll work under the guidance of professional chefs to prepare, cook, and package meals that make a real difference in people's lives.",
    responsibilities: ["Prepare ingredients and cook meals", "Follow food safety protocols", "Package meals for distribution", "Maintain kitchen cleanliness", "Assist with inventory management"],
    whoCanApply: ["Food handler's certificate preferred", "Comfortable working in a kitchen", "Age 18+", "No open wounds or illness"],
    benefits: ["Culinary skills development", "Food safety certification", "Community service hours", "Free meals"],
    gigEarning: 550,
    slotsAvailable: 12,
    impactMetrics: [
      { label: "Meals Prepared", value: "1000+" },
      { label: "People Fed", value: "800+" },
      { label: "Kitchen Hours", value: "500+" },
    ],
  },
  {
    id: 7,
    title: "Tree Planting Initiative",
    tagline: "Go green and earn while planting the future",
    location: "City Parks",
    date: "Apr 22, 2026",
    time: "7:00 AM – 12:00 PM",
    duration: "Half day",
    cause: "Environment",
    type: "In-person",
    skill: "General",
    skills: ["Physical Fitness", "Environmental Awareness", "Teamwork"],
    image: envImg,
    desc: "Join our city-wide tree planting initiative to create greener urban spaces.",
    fullDescription: "Celebrate Earth Day with our city-wide tree planting initiative! Help transform urban areas by planting native species, creating green corridors, and establishing new community gardens. This is your chance to leave a lasting green legacy in your city.",
    responsibilities: ["Plant trees and shrubs", "Coordinate with planting teams", "Map planting locations", "Water and mulch new plantings", "Document progress with photos"],
    whoCanApply: ["All ages welcome", "No experience needed", "Comfortable outdoors", "Bring your own water bottle"],
    benefits: ["Earth Day certificate", "Community recognition", "Free t-shirt", "Refreshments provided"],
    gigEarning: 450,
    slotsAvailable: 40,
    impactMetrics: [
      { label: "Trees Planted", value: "1000+" },
      { label: "Parks Covered", value: "15+" },
      { label: "CO₂ Offset", value: "50 tons/yr" },
    ],
  },
  {
    id: 8,
    title: "Home Repair Assistance",
    tagline: "Fix homes, fix lives, earn your skills' worth",
    location: "Various Locations",
    date: "Flexible",
    time: "By appointment",
    duration: "Flexible",
    cause: "Housing",
    type: "In-person",
    skill: "Construction",
    skills: ["Carpentry", "Plumbing", "Electrical", "Problem Solving"],
    image: housingImg,
    desc: "Help elderly homeowners with essential home repairs and maintenance.",
    fullDescription: "Use your handyman skills to help elderly and disabled homeowners with essential repairs they can't afford or manage alone. From fixing leaky faucets to repairing broken stairs, every repair makes a home safer and more livable for someone in need.",
    responsibilities: ["Assess repair needs", "Complete skilled repair tasks", "Source affordable materials", "Ensure safety compliance", "Follow up on completed work"],
    whoCanApply: ["Must have repair/construction skills", "Own basic tools preferred", "Age 18+", "Valid driver's license helpful"],
    benefits: ["Flexible scheduling", "Professional development", "Community impact", "Skill certification"],
    gigEarning: 700,
    slotsAvailable: 8,
    impactMetrics: [
      { label: "Homes Repaired", value: "100+" },
      { label: "Seniors Helped", value: "150+" },
      { label: "Safety Issues Fixed", value: "300+" },
    ],
  },
];

export const causes = ["All", "Hunger Relief", "Education", "Environment", "Housing"];
export const types = ["All", "In-person", "Online"];
