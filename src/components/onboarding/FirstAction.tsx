import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Send, Eye, Plus } from "lucide-react";
import { UserRole, OnboardingData } from "@/pages/Onboarding";

interface FirstActionProps {
  role: UserRole;
  data: OnboardingData;
  onComplete: () => void;
}

const FirstAction = ({ role, data, onComplete }: FirstActionProps) => {
  const mockInfluencers = [
    { id: 1, name: "Sarah Fashion", niche: "Fashion", followers: "25K", rate: "₦15,000" },
    { id: 2, name: "Tech Tony", niche: "Technology", followers: "50K", rate: "₦25,000" },
    { id: 3, name: "Food Lover", niche: "Food", followers: "30K", rate: "₦18,000" }
  ];

  const mockCampaigns = [
    { id: 1, brand: "Eco Water", budget: "₦50,000", type: "Product Review" },
    { id: 2, brand: "Fashion Store", budget: "₦30,000", type: "Lifestyle Post" },
    { id: 3, brand: "Tech Startup", budget: "₦75,000", type: "App Promotion" }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {role === 'brand' ? 'Your Suggested Matches' : 'Recommended Campaigns'}
          </h2>
          <p className="text-muted-foreground">
            {role === 'brand' 
              ? 'These influencers match your brand profile and budget'
              : 'These campaigns match your content style and interests'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {role === 'brand' ? (
            mockInfluencers.map((influencer) => (
              <Card key={influencer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold">{influencer.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{influencer.name}</h3>
                      <p className="text-sm text-muted-foreground">{influencer.followers} followers</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-3">{influencer.niche}</Badge>
                  <p className="text-sm text-muted-foreground mb-4">Starting at {influencer.rate}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Send className="w-4 h-4 mr-1" />
                      Invite
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            mockCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">Recommended</span>
                  </div>
                  <h3 className="font-semibold mb-2">{campaign.brand}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{campaign.type}</p>
                  <p className="font-semibold text-primary mb-4">{campaign.budget}</p>
                  <Button size="sm" className="w-full">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center">
          <div className="mb-6">
            <Button size="lg" onClick={onComplete}>
              {role === 'brand' ? (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Campaign
                </>
              ) : (
                'View All Opportunities'
              )}
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {role === 'brand' 
              ? "You can also browse all influencers and create custom campaigns"
              : "Or continue exploring your dashboard and profile settings"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstAction;