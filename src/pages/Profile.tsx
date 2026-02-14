import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Save, Loader2, LogOut, Camera, Edit, Calendar, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  full_name: string;
  username: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  avatar_url: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  location: string;
  bio: string;
  skills: string[];
  interests: string[];
}

const emptyProfile: ProfileData = {
  full_name: "", username: "", phone: "", date_of_birth: "", gender: "",
  avatar_url: "", address: "", city: "", state: "", country: "",
  zip_code: "", location: "", bio: "", skills: [], interests: [],
};

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(emptyProfile);
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
        const p: ProfileData = {
          full_name: data.full_name || "",
          username: (data as any).username || "",
          phone: data.phone || "",
          date_of_birth: (data as any).date_of_birth || "",
          gender: (data as any).gender || "",
          avatar_url: data.avatar_url || "",
          address: (data as any).address || "",
          city: (data as any).city || "",
          state: (data as any).state || "",
          country: (data as any).country || "",
          zip_code: (data as any).zip_code || "",
          location: data.location || "",
          bio: data.bio || "",
          skills: (data.skills as string[]) || [],
          interests: (data.interests as string[]) || [],
        };
        setProfile(p);
        setSkillsInput(p.skills.join(", "));
        setInterestsInput(p.interests.join(", "));
        // If profile is mostly empty, treat as new user in edit mode
        if (!p.full_name && !p.phone) {
          setIsNewUser(true);
          setEditing(true);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Upload Failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    const avatarUrl = `${publicUrl}?t=${Date.now()}`;
    setProfile({ ...profile, avatar_url: avatarUrl });

    await supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("user_id", user.id);
    setUploading(false);
    toast({ title: "Photo Updated", description: "Profile picture uploaded successfully." });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validation
    if (!profile.full_name.trim()) {
      toast({ title: "Required", description: "Full Name is required.", variant: "destructive" });
      return;
    }

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
        avatar_url: profile.avatar_url,
        username: profile.username || null,
        date_of_birth: profile.date_of_birth || null,
        gender: profile.gender || null,
        address: profile.address || null,
        city: profile.city || null,
        state: profile.state || null,
        country: profile.country || null,
        zip_code: profile.zip_code || null,
      } as any)
      .eq("user_id", user.id);

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated successfully.", description: "Your details have been saved." });
      setEditing(false);
      setIsNewUser(false);
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

  const avatarDisplay = profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || user?.email || "U")}&background=1e40af&color=fff&size=128`;

  // Dashboard / View Mode
  if (!editing) {
    return (
      <main className="py-12">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl bg-card p-8 shadow-card">
              {/* Header */}
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6 mb-8">
                <div className="relative">
                  <img
                    src={avatarDisplay}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover border-4 border-primary/20"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-extrabold text-foreground">{profile.full_name || "Your Name"}</h1>
                  {profile.username && <p className="text-sm text-muted-foreground">@{profile.username}</p>}
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  {profile.bio && <p className="mt-2 text-sm text-foreground/80">{profile.bio}</p>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                    <Edit className="mr-1 h-4 w-4" /> Edit Profile
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-1 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem icon={<Phone className="h-4 w-4" />} label="Phone" value={profile.phone} />
                <DetailItem icon={<Calendar className="h-4 w-4" />} label="Date of Birth" value={profile.date_of_birth} />
                <DetailItem icon={<User className="h-4 w-4" />} label="Gender" value={profile.gender} />
                <DetailItem icon={<MapPin className="h-4 w-4" />} label="Address" value={[profile.address, profile.city, profile.state].filter(Boolean).join(", ")} />
                <DetailItem icon={<Globe className="h-4 w-4" />} label="Country" value={[profile.country, profile.zip_code].filter(Boolean).join(" - ")} />
                <DetailItem icon={<MapPin className="h-4 w-4" />} label="Location" value={profile.location} />
              </div>

              {/* Skills & Interests */}
              {(profile.skills.length > 0 || profile.interests.length > 0) && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {profile.skills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.skills.map((s, i) => (
                          <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile.interests.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.interests.map((s, i) => (
                          <span key={i} className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // Edit Mode / Profile Setup
  return (
    <main className="py-12">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground">
                {isNewUser ? "Complete Your Profile" : "Edit Profile"}
              </h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            {!isNewUser && (
              <Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-card p-6 shadow-card">
            {/* Avatar Upload */}
            <div className="flex justify-center">
              <div className="relative cursor-pointer group" onClick={() => fileRef.current?.click()}>
                <img
                  src={avatarDisplay}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover border-4 border-primary/20 group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  {uploading ? <Loader2 className="h-6 w-6 text-primary-foreground animate-spin" /> : <Camera className="h-6 w-6 text-primary-foreground" />}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>

            {/* Name & Username */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" placeholder="Your full name" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                  <Input id="username" placeholder="username" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value.replace(/\s/g, "").toLowerCase() })} className="pl-8" />
                </div>
              </div>
            </div>

            {/* Phone & DOB */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="phone" placeholder="+91 98765 43210" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="dob" type="date" value={profile.date_of_birth} onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })} className="pl-10" />
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={profile.gender} onValueChange={(v) => setProfile({ ...profile, gender: v })}>
                <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Non-binary">Non-binary</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Street address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="City" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="State" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="Country" value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Zip / Postal Code</Label>
                <Input id="zip" placeholder="Zip code" value={profile.zip_code} onChange={(e) => setProfile({ ...profile, zip_code: e.target.value })} />
              </div>
            </div>

            {/* Location shorthand */}
            <div className="space-y-2">
              <Label htmlFor="location">Location (summary)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="location" placeholder="e.g., Mumbai, Maharashtra" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="pl-10" />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio / About Me</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3} />
            </div>

            {/* Skills & Interests */}
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
              {isNewUser ? "Save & Continue" : "Update Profile"}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default Profile;
