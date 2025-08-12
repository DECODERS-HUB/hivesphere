import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

const NewCampaign = () => {
  useEffect(()=>{document.title = "New Campaign — HiveSphere"},[]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Campaign created", description: "Invite influencers or keep it open." });
  };

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-semibold mb-6">Create Campaign</h1>
      <Card>
        <CardHeader>
          <CardTitle>Campaign details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Input id="desc" required />
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              <div>
                <Label htmlFor="budget">Budget (₦)</Label>
                <Input id="budget" type="number" min={5000} />
              </div>
              <div>
                <Label htmlFor="deliverables">Deliverables</Label>
                <Input id="deliverables" placeholder="Post, Story, Video" />
              </div>
              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Input id="timeline" placeholder="2 weeks" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="hero">Save</Button>
              <Button variant="outline">Invite influencers</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default NewCampaign;
