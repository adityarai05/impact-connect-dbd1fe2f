import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import OurWork from "./pages/OurWork";
import Opportunities from "./pages/Opportunities";
import Events from "./pages/Events";
import Donate from "./pages/Donate";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import JoinVolunteer from "./pages/JoinVolunteer";
import PartnerWithUs from "./pages/PartnerWithUs";
import Careers from "./pages/Careers";
import Internships from "./pages/Internships";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/our-work" element={<OurWork />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/events" element={<Events />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/get-involved/volunteer" element={<JoinVolunteer />} />
              <Route path="/get-involved/partner" element={<PartnerWithUs />} />
              <Route path="/get-involved/careers" element={<Careers />} />
              <Route path="/get-involved/internships" element={<Internships />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
