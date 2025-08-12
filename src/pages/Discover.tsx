import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";

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
      <aside className="space-y-6">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((i) => (
            <Card key={i.id} className="hover:shadow-brand-glow transition-transform hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle>{i.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Niche: {i.niche.join(", ")}</p>
                <p>Followers: {i.followers.toLocaleString()}</p>
                <p>Engagement: {i.engagement}%</p>
                <p>Price: ₦{i.price.toLocaleString()}</p>
                <div className="pt-2">
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
