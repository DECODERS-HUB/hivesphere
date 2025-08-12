import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const InfluencerDashboard = () => {
  useEffect(()=>{document.title = "Influencer Dashboard — HiveSphere"},[]);

  return (
    <main className="container py-8 space-y-6">
      <h1 className="text-3xl font-semibold">Welcome, Influencer</h1>
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Open Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No open campaigns yet.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Invitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">You have no invites.</p>
            <div className="flex gap-2">
              <Button variant="subtle">Refresh</Button>
              <Button variant="outline">Explore</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default InfluencerDashboard;
