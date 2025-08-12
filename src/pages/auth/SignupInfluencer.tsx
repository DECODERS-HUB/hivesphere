import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignupInfluencer = () => {
  const nav = useNavigate();
  useEffect(()=>{document.title = "Sign up as Influencer — HiveSphere"},[]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Welcome!", description: "Your influencer lead was submitted." });
    nav("/dashboard/influencer");
  };

  return (
    <main className="container py-8 grid md:grid-cols-2 gap-6">
      <section>
        <h1 className="text-3xl font-semibold mb-4">Create Your Influencer Profile</h1>
        <p className="text-muted-foreground mb-6">Join the Hive! Keep it simple — you can update details later.</p>
        <Card>
          <CardHeader>
            <CardTitle>Profile details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="niche">Niche (comma separated)</Label>
                <Input id="niche" placeholder="Beauty, Tech" />
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <Label htmlFor="ig">Instagram followers</Label>
                  <Input id="ig" type="number" min={0} />
                </div>
                <div>
                  <Label htmlFor="tt">TikTok followers</Label>
                  <Input id="tt" type="number" min={0} />
                </div>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <Label htmlFor="yt">YouTube subs</Label>
                  <Input id="yt" type="number" min={0} />
                </div>
                <div>
                  <Label htmlFor="tw">Twitter followers</Label>
                  <Input id="tw" type="number" min={0} />
                </div>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <Label htmlFor="er">Engagement rate (%)</Label>
                  <Input id="er" type="number" step="0.1" min={0} max={100} />
                </div>
                <div>
                  <Label htmlFor="price">Price per post (₦)</Label>
                  <Input id="price" type="number" min={5000} max={200000} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lang">Preferred content language</Label>
                <Input id="lang" placeholder="English, Pidgin, Yoruba..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="urls">Social media URLs</Label>
                <Input id="urls" placeholder="Add your links" />
              </div>
              <div className="pt-2 flex gap-3">
                <Button type="submit" variant="hero">Submit</Button>
                <Button variant="outline" onClick={() => nav("/discover")}>Explore first</Button>
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

export default SignupInfluencer;
