import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, Target } from "lucide-react";

interface WelcomeScreenProps {
  onContinue: () => void;
  onSkip: () => void;
}

const WelcomeScreen = ({ onContinue, onSkip }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="bg-card rounded-lg p-8 max-w-2xl w-full shadow-corporate">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Great to have you — let's set you up.
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            We'll ask a few quick questions to match you with brands/influencers that actually convert.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Quick Setup</h3>
            <p className="text-sm text-muted-foreground">Takes less than 5 minutes to complete</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Better Matches</h3>
            <p className="text-sm text-muted-foreground">AI-powered matching based on your profile</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">Your data is protected and never sold</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onContinue}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Start Setup
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            onClick={onSkip}
            variant="ghost"
            size="lg"
            className="text-muted-foreground hover:text-foreground"
          >
            Skip for now
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          Skipping limits your matches — you can always finish later.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;