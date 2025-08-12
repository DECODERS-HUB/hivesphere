import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SignupBrand = () => {
  const nav = useNavigate();
  useEffect(()=>{document.title = "Sign up as Brand — HiveSphere"},[]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Welcome!", description: "Your brand lead was submitted." });
    nav("/dashboard/brand");
  };

  return (
    <main className="container py-8 grid md:grid-cols-2 gap-6">
      <section>
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Step 1: Profile Info</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-muted" />
            <span>Step 2: Preferences</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-muted" />
            <span>Step 3: Complete</span>
          </div>
        </div>
        <h1 className="text-3xl font-semibold mb-4">Create Your Brand Profile</h1>
        <p className="text-muted-foreground mb-6">Let’s help you find the right creators for your budget.</p>
        <Card>
          <CardHeader>
            <CardTitle>Brand details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name">Brand name</Label>
                <Input id="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" placeholder="e.g. Fashion" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Typical monthly ad budget</Label>
                <Select>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectItem value="lt100k">Less than ₦100,000</SelectItem>
                    <SelectItem value="100k-500k">₦100,000 – ₦500,000</SelectItem>
                    <SelectItem value="500k-2m">₦500,000 – ₦2,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goals">Campaign goals</Label>
                <Input id="goals" placeholder="Drive app installs, boost sales..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">Brand logo (URL for now)</Label>
                <Input id="logo" type="url" placeholder="https://..." />
              </div>
              <div className="pt-2 flex gap-3">
                <Button type="submit" variant="hero">Submit</Button>
                <Button variant="outline" onClick={() => nav("/discover")}>Find influencers</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      <aside className="hidden md:block">
        <div className="rounded-xl bg-gradient-brand shadow-brand-glow h-full" />
      </aside>
    </main>
  );
};

export default SignupBrand;
