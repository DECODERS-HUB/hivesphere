import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
                <Input id="budget" placeholder="₦100,000 – ₦500,000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goals">Campaign goals</Label>
                <Input id="goals" placeholder="Drive app installs, boost sales..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">Brand logo (URL for now)</Label>
                <Input id="logo" placeholder="https://..." />
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
