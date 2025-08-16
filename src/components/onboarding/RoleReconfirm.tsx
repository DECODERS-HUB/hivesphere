import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, ArrowRight } from "lucide-react";
import { UserRole } from "@/pages/Onboarding";

interface RoleReconfirmProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onContinue: () => void;
}

const RoleReconfirm = ({ currentRole, onRoleChange, onContinue }: RoleReconfirmProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Let's confirm your role
          </h2>
          <p className="text-muted-foreground">
            This helps us customize your experience and show you relevant features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${
              currentRole === 'brand' 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => onRoleChange('brand')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">I'm a Brand</h3>
              <p className="text-muted-foreground mb-4">
                I want to find influencers to promote my products or services
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create campaigns</li>
                <li>• Find matching influencers</li>
                <li>• Track campaign performance</li>
              </ul>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${
              currentRole === 'influencer' 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => onRoleChange('influencer')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">I'm an Influencer</h3>
              <p className="text-muted-foreground mb-4">
                I want to collaborate with brands and monetize my content
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Apply to campaigns</li>
                <li>• Showcase my portfolio</li>
                <li>• Get paid for collaborations</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={onContinue}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Continue as {currentRole === 'brand' ? 'Brand' : 'Influencer'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleReconfirm;