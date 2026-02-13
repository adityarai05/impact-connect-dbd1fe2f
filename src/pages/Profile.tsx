import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Save, Loader2, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  full_name: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  interests: string[];
}

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: "",
    phone: "",
    location: "",
    bio: "",
    skills: [],
    interests: [],
  });
  const [skillsInput, setSkillsInput] = useState("");
  const [interestsInput, setInterestsInput] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setProfile({
          full_name: data.full_name || "",
          phone: data.phone || "",
          location: data.location || "",
          bio: data.bio || "",
          skills: (data.skills as string[]) || [],
          interests: (data.interests as string[]) || [],
        });
        setSkillsInput(((data.skills as string[]) || []).join(", "));
        setInterestsInput(((data.interests as string[]) || []).join(", "));
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const skills = skillsInput.split(",").map(s => s.trim()).filter(Boolean);
    const interests = interestsInput.split(",").map(s => s.trim()).filter(Boolean);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        skills,
        interests,
      })
      .eq("user_id", user.id);

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile Updated", description: "Your profile has been saved successfully." });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground">My Profile</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>

          <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-card p-6 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" placeholder="Your full name" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="phone" placeholder="Your phone number" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="pl-10" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="location" placeholder="City, State" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input id="skills" placeholder="Teaching, Cooking, Construction..." value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Interests (comma-separated)</Label>
              <Input id="interests" placeholder="Education, Environment, Health..." value={interestsInput} onChange={(e) => setInterestsInput(e.target.value)} />
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Profile
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default Profile;
