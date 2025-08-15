import { Brain, Calendar, Shield, MessageCircle, BarChart3, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Matching Engine",
      description: "Our AI-powered matching engine ensures brands find influencers who truly resonate with their target audience."
    },
    {
      icon: Calendar,
      title: "Campaign Management", 
      description: "Streamlined campaign workflow from creation to completion, with built-in timeline and deliverable tracking."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Protected transactions with milestone-based payments and dispute resolution for peace of mind."
    },
    {
      icon: MessageCircle,
      title: "Real-Time Chat",
      description: "Direct communication between brands and influencers with file sharing and project collaboration tools."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into campaign performance, reach, engagement, and ROI tracking."
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description: "Build trust through our review system that helps you find reliable partners for future collaborations."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to run successful influencer campaigns, all in one platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;