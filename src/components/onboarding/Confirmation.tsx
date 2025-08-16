import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { UserRole } from "@/pages/Onboarding";

interface ConfirmationProps {
  role: UserRole;
  onFinish: () => void;
}

const Confirmation = ({ role, onFinish }: ConfirmationProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Welcome to HiveSphere!</h2>
          
          <p className="text-muted-foreground mb-6">
            {role === 'brand' 
              ? "Your brand profile is ready. Start finding the perfect influencers for your campaigns."
              : "Your influencer profile is set up. Begin exploring exciting collaboration opportunities."
            }
          </p>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">What's Next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              {role === 'brand' ? (
                <>
                  <li>• Browse and invite influencers</li>
                  <li>• Create your first campaign</li>
                  <li>• Track campaign performance</li>
                </>
              ) : (
                <>
                  <li>• Apply to relevant campaigns</li>
                  <li>• Complete your portfolio</li>
                  <li>• Start earning from collaborations</li>
                </>
              )}
            </ul>
          </div>

          <Button onClick={onFinish} size="lg" className="w-full">
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Confirmation;