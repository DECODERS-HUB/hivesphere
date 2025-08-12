import Hero from "@/components/sections/Hero";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "HiveSphere — Micro & Nano Influencer Marketing";
  }, []);

  return (
    <main>
      <Hero />
      <section aria-labelledby="how-it-works" className="py-12 md:py-16">
        <div className="container">
          <h2 id="how-it-works" className="text-2xl md:text-3xl font-semibold mb-6">How HiveSphere Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="p-6 rounded-lg border bg-card shadow-brand-glow">
              <h3 className="font-semibold mb-2">1. Discover</h3>
              <p className="text-muted-foreground">Filter by niche, followers, engagement and price to find the perfect Nigerian micro and nano influencers.</p>
            </article>
            <article className="p-6 rounded-lg border bg-card shadow-brand-glow">
              <h3 className="font-semibold mb-2">2. Collaborate</h3>
              <p className="text-muted-foreground">Create a campaign, invite influencers or keep it open for applications. Chat in real time.</p>
            </article>
            <article className="p-6 rounded-lg border bg-card shadow-brand-glow">
              <h3 className="font-semibold mb-2">3. Grow</h3>
              <p className="text-muted-foreground">Track deliverables and keep things simple. Post-campaign ratings build trust.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
