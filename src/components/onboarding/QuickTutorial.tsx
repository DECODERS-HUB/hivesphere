import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Search, MessageCircle, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { UserRole } from "@/pages/Onboarding";

interface QuickTutorialProps {
  role: UserRole;
  onContinue: () => void;
  onSkip: () => void;
}

const QuickTutorial = ({ role, onContinue, onSkip }: QuickTutorialProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Search,
      title: "Smart Matching",
      description: role === 'brand' 
        ? "Our AI finds influencers who perfectly match your brand values and target audience."
        : "Get matched with brands that align with your content style and audience demographics."
    },
    {
      icon: MessageCircle,
      title: "Easy Communication",
      description: role === 'brand'
        ? "Chat directly with influencers, share briefs, and manage campaigns all in one place."
        : "Communicate with brands, receive briefs, and submit deliverables through our platform."
    },
    {
      icon: TrendingUp,
      title: "Track Performance",
      description: role === 'brand'
        ? "Monitor campaign performance, track ROI, and build lasting influencer relationships."
        : "Track your earnings, build your reputation, and grow your influencer business."
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onContinue();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              {slides.map((slide, index) => {
                const Icon = slide.icon;
                return (
                  <div key={index} className={`${index === currentSlide ? 'block' : 'hidden'}`}>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{slide.title}</h3>
                    <p className="text-muted-foreground">{slide.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center space-x-2 mb-6">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={prevSlide}
                variant="outline"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button onClick={onSkip} variant="ghost">
                Skip Tutorial
              </Button>
              
              <Button onClick={nextSlide}>
                {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickTutorial;