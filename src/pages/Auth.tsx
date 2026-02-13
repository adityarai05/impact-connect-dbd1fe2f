import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) navigate("/profile");
  }, [user, navigate]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setStep("otp");
      toast({ title: "OTP Sent!", description: "Check your email for the verification code." });
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp.trim(),
      type: "email",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Verification Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome!", description: "You have been logged in successfully." });
      navigate("/profile");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl bg-card p-8 shadow-card">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full gradient-primary">
              <Heart className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-extrabold text-card-foreground">
              {step === "email" ? "Welcome to ImpactHands" : "Verify Your Email"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {step === "email"
                ? "Enter your email to receive a one-time verification code."
                : `We've sent a 6-digit code to ${email}`}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                Send Verification Code
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-lg tracking-[0.5em]"
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Verify & Sign In
              </Button>
              <button
                type="button"
                onClick={() => { setStep("email"); setOtp(""); }}
                className="w-full text-center text-sm text-muted-foreground hover:text-primary"
              >
                Use a different email
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </main>
  );
};

export default Auth;
