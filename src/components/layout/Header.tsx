import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-hero text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/cdd54ec3-f5f9-41e6-b03a-6bb6ec87bb79.png" 
              alt="HiveSphere" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#pricing" 
              className="text-white/90 hover:text-white hover:underline transition-all duration-200"
            >
              Pricing
            </a>
            <Button 
              asChild 
              variant="ghost" 
              className="text-white border-white/20 hover:bg-white/10 hover:text-white"
            >
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button 
              asChild 
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-4 pt-4">
              <a 
                href="#pricing" 
                className="text-white/90 hover:text-white hover:underline transition-all duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <Button 
                asChild 
                variant="ghost" 
                className="text-white border-white/20 hover:bg-white/10 hover:text-white w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button 
                asChild 
                className="bg-primary hover:bg-primary/90 text-white w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
