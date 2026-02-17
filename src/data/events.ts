import foodImg from "@/assets/opportunity-food.jpg";
import eduImg from "@/assets/opportunity-education.jpg";
import envImg from "@/assets/opportunity-environment.jpg";
import housingImg from "@/assets/opportunity-housing.jpg";

export interface Event {
  id: number;
  title: string;
  tagline: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  spots: number;
  spotsLeft: number;
  desc: string;
  fullDescription: string;
  agenda: string[];
  expectedImpact: string;
  organizer: string;
  roles: { title: string; responsibilities: string[]; requirements: string[] }[];
  benefits: string[];
  howToEnroll: { whoCanJoin: string[]; documents: string[]; timeCommitment: string; selectionProcess: string };
}

export const allEvents: Event[] = [
  {
    id: 1,
    title: "Community Clean-Up Day",
    tagline: "Transform our neighborhood into a cleaner, greener place",
    date: "Mar 15, 2026",
    time: "9:00 AM – 2:00 PM",
    location: "Riverside Park",
    category: "Environment",
    image: envImg,
    spots: 50,
    spotsLeft: 12,
    desc: "Join us for a city-wide park clean-up. Bring gloves and enthusiasm!",
    fullDescription: "Our annual Community Clean-Up Day brings together hundreds of volunteers to transform Riverside Park and surrounding neighborhoods. Equipped with gloves, bags, and determination, participants will remove litter, paint benches, plant flowers, and restore walking trails to their former glory.",
    agenda: ["9:00 AM – Registration & Welcome", "9:30 AM – Team Assignments & Safety Briefing", "10:00 AM – Clean-Up Begins", "12:00 PM – Lunch Break & Community Talk", "1:00 PM – Final Push & Group Photo", "2:00 PM – Wrap-Up & Thank You"],
    expectedImpact: "We aim to collect over 2 tons of waste, restore 3 miles of trails, and plant 100+ flowers and shrubs across the park.",
    organizer: "ImpactHands Environmental Division",
    roles: [
      { title: "Trail Cleaner", responsibilities: ["Pick up litter along trails", "Sort recyclables"], requirements: ["Comfortable walking 3+ miles", "Age 14+"] },
      { title: "Garden Volunteer", responsibilities: ["Plant flowers and shrubs", "Mulch garden beds"], requirements: ["Able to kneel/bend", "No experience needed"] },
      { title: "Team Leader", responsibilities: ["Coordinate 5-8 volunteers", "Report progress"], requirements: ["Leadership experience", "Age 18+"] },
    ],
    benefits: ["Community service certificate", "Free lunch & refreshments", "ImpactHands t-shirt", "Networking opportunities"],
    howToEnroll: { whoCanJoin: ["Anyone aged 14+", "Families welcome", "Groups and organizations"], documents: ["Valid ID", "Signed waiver (provided on-site)"], timeCommitment: "5 hours (9 AM – 2 PM)", selectionProcess: "First come, first served. Register early to secure your spot!" },
  },
  {
    id: 2,
    title: "Food Drive Collection",
    tagline: "Every can counts – help us fight hunger together",
    date: "Mar 22, 2026",
    time: "10:00 AM – 4:00 PM",
    location: "Community Center",
    category: "Hunger Relief",
    image: foodImg,
    spots: 30,
    spotsLeft: 8,
    desc: "Help sort and distribute food donations to families in need.",
    fullDescription: "Our Food Drive Collection event is a massive effort to gather, sort, and distribute non-perishable food items to over 300 families facing food insecurity. Volunteers will work at collection points, sort donations by category, prepare family-sized packages, and help with direct distribution.",
    agenda: ["10:00 AM – Volunteer Check-In", "10:30 AM – Sorting Stations Open", "12:00 PM – Lunch Break", "1:00 PM – Package Assembly", "3:00 PM – Distribution Begins", "4:00 PM – Close & Clean-Up"],
    expectedImpact: "Target: 5,000 lbs of food collected, 300+ families served, and 10+ community partners engaged.",
    organizer: "ImpactHands Hunger Relief Team",
    roles: [
      { title: "Sorter", responsibilities: ["Categorize food items", "Check expiration dates"], requirements: ["Attention to detail", "Able to stand for extended periods"] },
      { title: "Packer", responsibilities: ["Assemble family food packages", "Label packages"], requirements: ["Organizational skills", "Age 16+"] },
    ],
    benefits: ["Volunteer certificate", "Free meals during event", "Community impact report"],
    howToEnroll: { whoCanJoin: ["Age 16+", "Community members", "Corporate volunteer groups"], documents: ["Photo ID"], timeCommitment: "6 hours", selectionProcess: "Open registration until spots are filled." },
  },
  {
    id: 3,
    title: "Youth Mentoring Workshop",
    tagline: "Become a mentor and change a young person's life",
    date: "Apr 5, 2026",
    time: "1:00 PM – 5:00 PM",
    location: "Lincoln Library",
    category: "Education",
    image: eduImg,
    spots: 20,
    spotsLeft: 5,
    desc: "Train to become a youth mentor and make a lasting impact on a young person's life.",
    fullDescription: "This intensive workshop prepares aspiring mentors to guide at-risk youth through academic challenges and personal growth. Learn proven mentoring techniques, communication strategies, and how to build trust with young people. Graduates are matched with mentees for our 6-month mentoring program.",
    agenda: ["1:00 PM – Welcome & Program Overview", "1:30 PM – Understanding Youth Development", "2:30 PM – Communication & Trust Building", "3:30 PM – Role-Play Scenarios", "4:30 PM – Q&A and Next Steps"],
    expectedImpact: "Train 20 new mentors who will collectively impact 60+ youth over the next year.",
    organizer: "ImpactHands Education Division",
    roles: [
      { title: "Mentor Trainee", responsibilities: ["Complete full training workshop", "Commit to 6-month mentoring"], requirements: ["Age 21+", "Background check", "Reliable transportation"] },
    ],
    benefits: ["Certified mentor training", "Ongoing support from program staff", "Professional development credits", "Reference letter upon completion"],
    howToEnroll: { whoCanJoin: ["Adults 21+", "Professionals and students", "Retirees"], documents: ["Photo ID", "Background check consent form"], timeCommitment: "4-hour workshop + 2 hours/week for 6 months", selectionProcess: "Application reviewed by program coordinator. Background check required." },
  },
  {
    id: 4,
    title: "Earth Day Tree Planting",
    tagline: "Plant a tree, grow a legacy for future generations",
    date: "Apr 22, 2026",
    time: "8:00 AM – 12:00 PM",
    location: "Greenfield Park",
    category: "Environment",
    image: envImg,
    spots: 100,
    spotsLeft: 34,
    desc: "Celebrate Earth Day by planting trees and restoring green spaces.",
    fullDescription: "Celebrate Earth Day by joining hundreds of volunteers to plant 500+ native trees across Greenfield Park. This annual tradition has transformed barren lots into thriving green spaces. Each volunteer plants 5-10 trees and receives a certificate recognizing their contribution to our urban forest.",
    agenda: ["8:00 AM – Registration & Breakfast", "8:30 AM – Earth Day Keynote", "9:00 AM – Planting Begins", "11:00 AM – Group Photo & Celebration", "12:00 PM – Wrap-Up"],
    expectedImpact: "Plant 500+ trees, offset 25 tons of CO₂ annually, and create habitats for 50+ wildlife species.",
    organizer: "ImpactHands Green Initiative",
    roles: [
      { title: "Tree Planter", responsibilities: ["Dig holes and plant saplings", "Apply mulch and water"], requirements: ["Physically able", "All ages welcome"] },
      { title: "Site Coordinator", responsibilities: ["Guide planting teams", "Manage supplies"], requirements: ["Leadership skills", "Age 18+"] },
    ],
    benefits: ["Earth Day certificate", "Free breakfast", "Commemorative tree tag", "ImpactHands t-shirt"],
    howToEnroll: { whoCanJoin: ["All ages (under 14 with guardian)", "Families", "Schools and organizations"], documents: ["None required"], timeCommitment: "4 hours", selectionProcess: "Open registration. Walk-ins welcome!" },
  },
  {
    id: 5,
    title: "Summer Kickoff Fundraiser",
    tagline: "Celebrate community with music, food, and giving back",
    date: "May 10, 2026",
    time: "6:00 PM – 10:00 PM",
    location: "Grand Hall",
    category: "Fundraiser",
    image: foodImg,
    spots: 200,
    spotsLeft: 75,
    desc: "Join our annual fundraiser gala with live music, food, and community celebration.",
    fullDescription: "Our signature Summer Kickoff Fundraiser brings together community leaders, volunteers, and supporters for an unforgettable evening of live music, gourmet food, and inspiring stories. All proceeds fund our year-round volunteering programs and community initiatives.",
    agenda: ["6:00 PM – Cocktail Reception", "7:00 PM – Welcome & Keynote", "7:30 PM – Dinner Service", "8:30 PM – Live Auction", "9:00 PM – Live Music & Dancing", "10:00 PM – Close"],
    expectedImpact: "Raise $50,000+ to fund 10 community programs serving 5,000+ beneficiaries.",
    organizer: "ImpactHands Foundation",
    roles: [
      { title: "Event Volunteer", responsibilities: ["Assist with setup and registration", "Guide guests"], requirements: ["Professional attire", "Age 18+"] },
      { title: "Auction Assistant", responsibilities: ["Display auction items", "Track bids"], requirements: ["Attention to detail", "Tech-savvy"] },
    ],
    benefits: ["Complimentary dinner", "Networking with community leaders", "Volunteer appreciation gift", "Event certificate"],
    howToEnroll: { whoCanJoin: ["Age 18+", "Community members", "Corporate sponsors"], documents: ["Photo ID"], timeCommitment: "4-5 hours", selectionProcess: "Register online. Limited spots available." },
  },
  {
    id: 6,
    title: "Back to School Supply Drive",
    tagline: "Every child deserves the tools to succeed",
    date: "Aug 1, 2026",
    time: "9:00 AM – 3:00 PM",
    location: "City Square",
    category: "Education",
    image: eduImg,
    spots: 40,
    spotsLeft: 22,
    desc: "Help collect and distribute school supplies for underprivileged students.",
    fullDescription: "Ensure every child starts the school year with the supplies they need! Our Back to School Supply Drive collects backpacks, notebooks, pencils, and more from generous donors and distributes them to families in need. Volunteers help sort, pack, and distribute supplies at community pick-up points.",
    agenda: ["9:00 AM – Setup & Volunteer Briefing", "9:30 AM – Collection Points Open", "11:00 AM – Sorting & Packing", "1:00 PM – Distribution Begins", "3:00 PM – Close"],
    expectedImpact: "Provide school supplies to 500+ students across 15 schools.",
    organizer: "ImpactHands Education Team",
    roles: [
      { title: "Collection Volunteer", responsibilities: ["Staff collection points", "Receive donations"], requirements: ["Friendly demeanor", "Age 14+"] },
      { title: "Distribution Helper", responsibilities: ["Pack supply kits", "Distribute to families"], requirements: ["Organized", "Age 16+"] },
    ],
    benefits: ["Volunteer certificate", "Free lunch", "Community recognition"],
    howToEnroll: { whoCanJoin: ["Age 14+", "Families", "Student groups"], documents: ["None required"], timeCommitment: "6 hours", selectionProcess: "Open registration until full." },
  },
];

export const eventCategories = ["All", "Environment", "Hunger Relief", "Education", "Fundraiser"];
