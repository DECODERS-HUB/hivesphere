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
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-gradient-hero text-white">
      <div ref={ref} className="spotlight" />
      <div className="container pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 id="hero-title" className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Where Brands Meet the Right Influencers
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Connect, Collaborate, and Grow your brand with verified influencers — all in one seamless platform.
            </p>
            <div className="flex items-start gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="aspect-square bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="text-white/50 text-6xl">🤝</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
