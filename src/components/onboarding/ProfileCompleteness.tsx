import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, CheckCircle, Circle, User, Shield, Image, DollarSign, Target } from "lucide-react";
import { OnboardingData } from "@/pages/Onboarding";

interface ProfileCompletenessProps {
  data: OnboardingData;
  onContinue: () => void;
  onBack: () => void;
}

const ProfileCompleteness = ({ data, onContinue, onBack }: ProfileCompletenessProps) => {
  const calculateCompleteness = () => {
    let completed = 0;
    let total = 5;

    // Core Profile (always required)
    if (data.role === 'brand') {
      if (data.coreProfile?.companyName && data.coreProfile?.industry && data.coreProfile?.campaignGoal) {
        completed++;
      }
    } else {
      if (data.coreProfile?.displayName && data.coreProfile?.niches?.length > 0 && data.coreProfile?.platforms?.length > 0) {
        completed++;
      }
    }

    // Matching Attributes
    if (data.role === 'brand') {
      if (data.matchingAttributes?.ageRange && data.matchingAttributes?.pricePerDeliverable) {
        completed++;
      }
    } else {
      if (data.matchingAttributes?.contentFormats?.length > 0 && data.matchingAttributes?.collaborationTypes?.length > 0) {
        completed++;
      }
    }

    // Trust & Verification
    const socialLinks = [
      data.trustData?.website,
      data.trustData?.instagram,
      data.trustData?.youtube,
      data.trustData?.tiktok,
      data.trustData?.twitter,
      data.trustData?.linkedin
    ].filter(Boolean);
    if (socialLinks.length > 0) {
      completed++;
    }

    // Portfolio (optional but counted)
    if (data.portfolio?.length > 0) {
      completed++;
    }

    // Pricing (for influencers)
    if (data.role === 'influencer' && data.matchingAttributes?.minimumRate > 0) {
      completed++;
    } else if (data.role === 'brand') {
      total = 4; // Brands don't have pricing section
    }

    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const completeness = calculateCompleteness();

  const checklistItems = [
    {
      id: 'profile',
      icon: User,
      title: 'Core Profile',
      description: data.role === 'brand' ? 'Company info, industry, goals' : 'Name, niches, platforms',
      completed: data.role === 'brand' 
        ? !!(data.coreProfile?.companyName && data.coreProfile?.industry && data.coreProfile?.campaignGoal)
        : !!(data.coreProfile?.displayName && data.coreProfile?.niches?.length > 0 && data.coreProfile?.platforms?.length > 0),
      required: true
    },
    {
      id: 'matching',
      icon: Target,
      title: 'Targeting Preferences',
      description: data.role === 'brand' ? 'Audience demographics, budget' : 'Content types, collaboration style',
      completed: data.role === 'brand'
        ? !!(data.matchingAttributes?.ageRange && data.matchingAttributes?.pricePerDeliverable)
        : !!(data.matchingAttributes?.contentFormats?.length > 0 && data.matchingAttributes?.collaborationTypes?.length > 0),
      required: true
    },
    {
      id: 'verification',
      icon: Shield,
      title: 'Social Verification',
      description: 'At least one social profile linked',
      completed: [
        data.trustData?.website,
        data.trustData?.instagram,
        data.trustData?.youtube,
        data.trustData?.tiktok,
        data.trustData?.twitter,
        data.trustData?.linkedin
      ].some(Boolean),
      required: true
    },
    {
      id: 'portfolio',
      icon: Image,
      title: data.role === 'brand' ? 'Brand Assets' : 'Portfolio',
      description: data.role === 'brand' ? 'Brand assets and examples' : 'Work samples and portfolio',
      completed: (data.portfolio?.length || 0) > 0,
      required: false
    }
  ];

  if (data.role === 'influencer') {
    checklistItems.push({
      id: 'pricing',
      icon: DollarSign,
      title: 'Rate Settings',
      description: 'Minimum rates and pricing',
      completed: (data.matchingAttributes?.minimumRate || 0) > 0,
      required: false
    });
  }

  const getQualityLevel = () => {
    if (completeness.percentage >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (completeness.percentage >= 70) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (completeness.percentage >= 50) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Needs Work', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const quality = getQualityLevel();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Profile Review
            </CardTitle>
            <p className="text-muted-foreground">
              Your profile completeness affects match quality and ranking in search results.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Completeness Overview */}
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold mb-2">{completeness.percentage}%</div>
              <div className="mb-4">
                <Progress value={completeness.percentage} className="h-3" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge className={`${quality.bg} ${quality.color} border-0`}>
                  {quality.level} Profile
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {completeness.completed} of {completeness.total} sections completed
              </p>
            </div>

            {/* Impact Message */}
            <div className="bg-primary/10 border border-primary/20 rounded-md p-4">
              <h4 className="font-medium text-primary mb-2">Why completeness matters:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complete profiles get 3× more matches</li>
                <li>• Higher ranking in search results</li>
                <li>• Better quality {data.role === 'brand' ? 'influencer applications' : 'campaign invitations'}</li>
                <li>• Increased trust from potential partners</li>
              </ul>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <h4 className="font-medium">Profile Checklist</h4>
              {checklistItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-md border">
                    <div className="mt-0.5">
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.title}</span>
                        {item.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
                        {item.completed && <Badge variant="outline" className="text-xs text-green-600">Complete</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Privacy Notice */}
            <div className="text-center p-4 bg-muted/30 rounded-md">
              <p className="text-sm text-muted-foreground">
                <Shield className="w-4 h-4 inline mr-1" />
                We'll only use your data to match and facilitate campaigns — not sell it.
              </p>
              <Button variant="link" size="sm" className="text-xs">
                View Privacy Policy
              </Button>
            </div>

            <div className="flex justify-between pt-4">
              <Button onClick={onBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={onContinue}>
                See My Matches
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCompleteness;