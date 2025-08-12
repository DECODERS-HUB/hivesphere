import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/cdd54ec3-f5f9-41e6-b03a-6bb6ec87bb79.png" alt="HiveSphere logo green" className="h-8 w-auto" />
          <span className="font-semibold">HiveSphere</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/discover" className={({isActive}) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Discover</NavLink>
          <NavLink to="/feed" className={({isActive}) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Community</NavLink>
          <NavLink to="/messages" className={({isActive}) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Messages</NavLink>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="subtle">
            <Link to="/signup-influencer">For Influencers</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/signup-brand">For Brands</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
