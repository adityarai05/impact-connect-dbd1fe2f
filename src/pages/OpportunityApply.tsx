import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, Send, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const OpportunityApply = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    motivation: "",
    availability: "",
  });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      setForm(prev => ({ ...prev, email: user.email || "" }));
      // Fetch profile for pre-filling
      supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => {
        if (data) {
          setForm(prev => ({
            ...prev,
            full_name: data.full_name || "",
            phone: data.phone || "",
            location: data.location || "",
          }));
        }
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("opportunity_applications").insert({
      user_id: user.id,
      opportunity_title: title,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      location: form.location,
      experience: form.experience,
      motivation: form.motivation,
      availability: form.availability,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setShowConfirm(true);
    }
  };

  if (authLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="py-12">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate("/opportunities")} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Opportunities
          </button>

          <h1 className="mb-2 text-3xl font-extrabold text-foreground">Apply for Opportunity</h1>
          <p className="mb-6 text-lg font-semibold text-primary">{title}</p>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-card p-6 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Relevant Experience</Label>
              <Textarea value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} rows={3} placeholder="Describe any relevant experience..." />
            </div>
            <div className="space-y-2">
              <Label>Why do you want to volunteer?</Label>
              <Textarea value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} rows={3} placeholder="Your motivation..." />
            </div>
            <div className="space-y-2">
              <Label>Availability</Label>
              <Input value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} placeholder="e.g. Weekends, 4 hours/week" />
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Submit Application
            </Button>
          </form>
        </motion.div>
      </div>

      <ConfirmationDialog
        open={showConfirm}
        onClose={() => { setShowConfirm(false); navigate("/opportunities"); }}
        title="Application Submitted!"
        message="Thank you for applying! We'll review your application and get back to you soon."
      />
    </main>
  );
};

export default OpportunityApply;
