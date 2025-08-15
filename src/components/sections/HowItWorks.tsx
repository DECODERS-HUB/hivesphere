import { UserPlus, Search, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Register as a brand or influencer in minutes with our simple onboarding process."
    },
    {
      icon: Search,
      title: "Discover & Connect", 
      description: "AI-powered matching engine to find perfect partners that align with your goals."
    },
    {
      icon: TrendingUp,
      title: "Collaborate & Grow",
      description: "Manage campaigns, track results, and build lasting partnerships that drive growth."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 text-white" style={{backgroundColor: 'hsl(117, 18%, 16%)'}}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Get started in three simple steps and watch your brand grow with the right influencer partnerships.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;