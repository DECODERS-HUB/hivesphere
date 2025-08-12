import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const BrandDashboard = () => {
  useEffect(()=>{document.title = "Brand Dashboard — HiveSphere"},[]);

  return (
    <main className="container py-8 space-y-6">
      <h1 className="text-3xl font-semibold">Welcome, Brand</h1>
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No campaigns yet.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Match</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">Get 5 suggested creators based on your budget & goals.</p>
            <Button variant="hero">Run Quick Match</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default BrandDashboard;
