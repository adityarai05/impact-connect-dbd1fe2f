import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedOpportunities from "@/components/home/FeaturedOpportunities";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturedOpportunities />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Index;
