import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [userType, setUserType] = useState<string>("");
  
  useEffect(() => {
    document.title = "Register — HiveSphere";
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userType) {
      toast({ title: "Please select account type", variant: "destructive" });
      return;
    }
    
    toast({ title: "Welcome to HiveSphere!", description: "Your account has been created successfully." });
    
    if (userType === "brand") {
      nav("/signup-brand");
    } else {
      nav("/signup-influencer");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="/lovable-uploads/cdd54ec3-f5f9-41e6-b03a-6bb6ec87bb79.png" alt="HiveSphere logo" className="h-8 w-auto" />
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <p className="text-muted-foreground">Join the HiveSphere community today</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="userType">I am a...</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-popover">
                  <SelectItem value="brand">Brand / Business</SelectItem>
                  <SelectItem value="influencer">Influencer / Creator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-2 space-y-3">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Continue
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Register;