import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Fair Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="relative border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">For Brands</CardTitle>
              <div className="text-3xl font-bold text-primary mb-2">Start Free</div>
              <p className="text-muted-foreground">Pay only when you launch campaigns</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {[
                  "Browse unlimited influencer profiles",
                  "AI-powered matching recommendations",
                  "Direct messaging with influencers", 
                  "Campaign management tools",
                  "Basic analytics dashboard",
                  "Pay-per-campaign pricing"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/signup-brand">Start Free Trial</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="relative border-2 border-primary hover:shadow-lg transition-shadow">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">Popular</span>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl mb-2">For Influencers</CardTitle>
              <div className="text-3xl font-bold text-primary mb-2">Always Free</div>
              <p className="text-muted-foreground">No fees, ever. Keep 100% of your earnings</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {[
                  "Create detailed influencer profile",
                  "Get discovered by top brands",
                  "Apply to open campaigns",
                  "Receive direct invitations",
                  "Secure payment processing",
                  "Build your reputation with reviews"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/signup-influencer">Join Free Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;