import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface Influencer {
  id: string;
  name: string;
  niche: string[];
  followers: number;
  engagement: number; // percentage
  price: number; // per post in NGN
  language: string;
}

const MOCK: Influencer[] = [
  { id: "1", name: "Ada E.", niche: ["Beauty", "Lifestyle"], followers: 18000, engagement: 6.2, price: 40000, language: "English" },
  { id: "2", name: "Seyi V.", niche: ["Tech", "Education"], followers: 52000, engagement: 4.1, price: 80000, language: "Yoruba" },
  { id: "3", name: "Hauwa", niche: ["Food"], followers: 12000, engagement: 7.9, price: 30000, language: "Hausa" },
  { id: "4", name: "Chisom", niche: ["Fashion"], followers: 70000, engagement: 3.5, price: 120000, language: "Igbo" },
];

const Discover = () => {
  const [niche, setNiche] = useState<string>("");
  const [followers, setFollowers] = useState<number[]>([100000]);
  const [engagement, setEngagement] = useState<number[]>([10]);
  const [price, setPrice] = useState<number[]>([200000]);
  const [language, setLanguage] = useState<string>("");

  useEffect(() => { document.title = "Discover Influencers — HiveSphere"; }, []);

  const initials = (name: string) => name.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase();

  const results = useMemo(() => {
    return MOCK.filter((i) =>
      (!niche || i.niche.includes(niche)) &&
      i.followers <= followers[0] &&
      i.engagement <= engagement[0] &&
      i.price <= price[0] &&
      (!language || i.language === language)
    );
  }, [niche, followers, engagement, price, language]);

  return (
    <main className="container py-8 grid md:grid-cols-[280px_1fr] gap-6">
      <aside id="filters" className="space-y-6 md:sticky md:top-20">
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="niche">Niche</Label>
              <Input id="niche" placeholder="e.g. Beauty" value={niche} onChange={(e) => setNiche(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Follower max: {followers[0].toLocaleString()}</Label>
              <Slider min={1000} max={100000} step={1000} value={followers} onValueChange={(v)=>setFollowers(v)} />
            </div>
            <div className="space-y-2">
              <Label>Engagement max: {engagement[0]}%</Label>
              <Slider min={1} max={20} step={1} value={engagement} onValueChange={(v)=>setEngagement(v)} />
            </div>
            <div className="space-y-2">
              <Label>Price max: ₦{price[0].toLocaleString()}</Label>
              <Slider min={5000} max={200000} step={5000} value={price} onValueChange={(v)=>setPrice(v)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lang">Preferred language</Label>
              <Input id="lang" placeholder="English, Yoruba..." value={language} onChange={(e)=>setLanguage(e.target.value)} />
            </div>
            <Button variant="subtle" onClick={()=>{setNiche("");setFollowers([100000]);setEngagement([10]);setPrice([200000]);setLanguage("");}}>Reset</Button>
          </CardContent>
        </Card>
      </aside>

      <section aria-labelledby="results-title" className="space-y-4">
        <h1 id="results-title" className="text-2xl font-semibold">Influencers</h1>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{results.length} result{results.length !== 1 ? 's' : ''}</p>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="md:hidden">
              <a href="#filters">Filters</a>
            </Button>
            <Button asChild variant="subtle" className="hidden md:inline-flex">
              <Link to="/dashboard/brand?quickMatch=1">Quick Match</Link>
            </Button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((i) => (
            <Card key={i.id} className="hover:shadow-brand-glow transition-transform hover:-translate-y-0.5">
              <CardHeader className="flex flex-row items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{initials(i.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{i.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{i.niche.join(", ")}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-md bg-muted/40 p-2">
                    <div className="text-muted-foreground">Followers</div>
                    <div className="font-medium">{i.followers.toLocaleString()}</div>
                  </div>
                  <div className="rounded-md bg-muted/40 p-2">
                    <div className="text-muted-foreground">Engagement</div>
                    <div className="font-medium">{i.engagement}%</div>
                  </div>
                  <div className="rounded-md bg-muted/40 p-2">
                    <div className="text-muted-foreground">Price</div>
                    <div className="font-medium">₦{i.price.toLocaleString()}</div>
                  </div>
                </div>
                <div className="pt-1">
                  <Button variant="hero" size="sm">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Discover;
