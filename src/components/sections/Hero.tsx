import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--spot-x", x + "%");
      el.style.setProperty("--spot-y", y + "%");
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div ref={ref} className="spotlight" />
      <div className="container pt-16 pb-20 md:pt-24 md:pb-28 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center mb-6">
            <img src="/lovable-uploads/cdd54ec3-f5f9-41e6-b03a-6bb6ec87bb79.png" alt="HiveSphere green logo wordmark" className="h-10 md:h-12 w-auto" />
          </div>
          <h1 id="hero-title" className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-gradient-brand">Find Nigerian Micro & Nano Influencers</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Fast discovery, simple campaign workflows, and friendly chat — built for budgets under ₦2,000,000.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/discover">Find Influencers</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/campaigns/new">Create Campaign</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
