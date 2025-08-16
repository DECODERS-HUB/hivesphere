import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Building2, Users, MapPin, Target, DollarSign } from "lucide-react";
import { UserRole } from "@/pages/Onboarding";

interface CoreProfileProps {
  role: UserRole;
  data: any;
  onUpdate: (data: any) => void;
  onContinue: () => void;
  onBack: () => void;
}

const CoreProfile = ({ role, data, onUpdate, onContinue, onBack }: CoreProfileProps) => {
  const [formData, setFormData] = useState({
    // Brand fields
    companyName: data.companyName || "",
    industry: data.industry || "",
    city: data.city || "",
    state: data.state || "",
    campaignGoal: data.campaignGoal || "",
    monthlyBudget: data.monthlyBudget || "",
    
    // Influencer fields
    displayName: data.displayName || "",
    handle: data.handle || "",
    niches: data.niches || [],
    platforms: data.platforms || [],
    followerCounts: data.followerCounts || {},
    
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const industries = [
    "Fashion & Beauty", "Food & Beverage", "Technology", "Health & Fitness",
    "Travel & Lifestyle", "Finance", "Education", "Entertainment", "Sports",
    "Home & Garden", "Automotive", "Gaming", "Parenting", "Business"
  ];

  const campaignGoals = [
    "Brand Awareness", "Sales & Conversions", "Event Promotion", 
    "App Downloads", "Lead Generation", "Product Launch"
  ];

  const budgetRanges = [
    "< ₦100,000", "₦100,000 - ₦500,000", "₦500,000 - ₦1,000,000", 
    "₦1,000,000 - ₦2,500,000", "> ₦2,500,000"
  ];

  const niches = [
    "Fashion", "Beauty", "Lifestyle", "Food", "Travel", "Fitness", 
    "Technology", "Gaming", "Business", "Parenting", "Home", "Finance"
  ];

  const platforms = [
    { id: "instagram", name: "Instagram" },
    { id: "tiktok", name: "TikTok" },
    { id: "youtube", name: "YouTube" },
    { id: "twitter", name: "X (Twitter)" },
    { id: "linkedin", name: "LinkedIn" }
  ];

  const followerRanges = [
    "1K - 10K", "10K - 50K", "50K - 100K", "100K - 500K", "500K - 1M", "1M+"
  ];

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const toggleArrayValue = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (role === "brand") {
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
      if (!formData.industry) newErrors.industry = "Industry is required";
      if (!formData.campaignGoal) newErrors.campaignGoal = "Campaign goal is required";
      if (!formData.monthlyBudget) newErrors.monthlyBudget = "Budget range is required";
    } else {
      if (!formData.displayName.trim()) newErrors.displayName = "Display name is required";
      if (formData.niches.length === 0) newErrors.niches = "Select at least one niche";
      if (formData.platforms.length === 0) newErrors.platforms = "Select at least one platform";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onUpdate(formData);
      onContinue();
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {role === "brand" ? <Building2 className="w-5 h-5" /> : <Users className="w-5 h-5" />}
              {role === "brand" ? "Brand Profile" : "Influencer Profile"}
            </CardTitle>
            <p className="text-muted-foreground">
              Tell us about yourself to get better matches
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {role === "brand" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company/Brand Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="e.g., Keke Foods Ltd"
                    value={formData.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    className={errors.companyName ? "border-destructive" : ""}
                  />
                  {errors.companyName && (
                    <p className="text-sm text-destructive">{errors.companyName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => updateField("industry", value)}>
                    <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-sm text-destructive">{errors.industry}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      City
                    </Label>
                    <Input
                      id="city"
                      placeholder="Lagos"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="Lagos State"
                      value={formData.state}
                      onChange={(e) => updateField("state", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    <Target className="w-4 h-4 inline mr-1" />
                    Primary Campaign Goal *
                  </Label>
                  <Select value={formData.campaignGoal} onValueChange={(value) => updateField("campaignGoal", value)}>
                    <SelectTrigger className={errors.campaignGoal ? "border-destructive" : ""}>
                      <SelectValue placeholder="What's your main goal?" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaignGoals.map((goal) => (
                        <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.campaignGoal && (
                    <p className="text-sm text-destructive">{errors.campaignGoal}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Monthly Ad Budget *
                  </Label>
                  <Select value={formData.monthlyBudget} onValueChange={(value) => updateField("monthlyBudget", value)}>
                    <SelectTrigger className={errors.monthlyBudget ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    This helps us recommend influencers that fit your budget.
                  </p>
                  {errors.monthlyBudget && (
                    <p className="text-sm text-destructive">{errors.monthlyBudget}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name *</Label>
                    <Input
                      id="displayName"
                      placeholder="Your name or brand"
                      value={formData.displayName}
                      onChange={(e) => updateField("displayName", e.target.value)}
                      className={errors.displayName ? "border-destructive" : ""}
                    />
                    {errors.displayName && (
                      <p className="text-sm text-destructive">{errors.displayName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="handle">Handle/Username</Label>
                    <Input
                      id="handle"
                      placeholder="@yourhandle"
                      value={formData.handle}
                      onChange={(e) => updateField("handle", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Primary Niches * (Pick up to 3)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {niches.map((niche) => (
                      <div key={niche} className="flex items-center space-x-2">
                        <Checkbox
                          id={niche}
                          checked={formData.niches.includes(niche)}
                          onCheckedChange={() => toggleArrayValue("niches", niche)}
                          disabled={!formData.niches.includes(niche) && formData.niches.length >= 3}
                        />
                        <Label htmlFor={niche} className="text-sm">{niche}</Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pick the niches that best describe the content you create.
                  </p>
                  {errors.niches && (
                    <p className="text-sm text-destructive">{errors.niches}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      <MapPin className="w-4 h-4 inline mr-1" />
                      City
                    </Label>
                    <Input
                      placeholder="Lagos"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input
                      placeholder="Lagos State"
                      value={formData.state}
                      onChange={(e) => updateField("state", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Primary Platforms * (Select all that apply)</Label>
                  <div className="space-y-3">
                    {platforms.map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={platform.id}
                            checked={formData.platforms.includes(platform.id)}
                            onCheckedChange={() => toggleArrayValue("platforms", platform.id)}
                          />
                          <Label htmlFor={platform.id}>{platform.name}</Label>
                        </div>
                        {formData.platforms.includes(platform.id) && (
                          <Select 
                            value={formData.followerCounts[platform.id] || ""} 
                            onValueChange={(value) => 
                              updateField("followerCounts", { 
                                ...formData.followerCounts, 
                                [platform.id]: value 
                              })
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Followers" />
                            </SelectTrigger>
                            <SelectContent>
                              {followerRanges.map((range) => (
                                <SelectItem key={range} value={range}>{range}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use brackets if you prefer not sharing exact counts — you can verify later.
                  </p>
                  {errors.platforms && (
                    <p className="text-sm text-destructive">{errors.platforms}</p>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-between pt-4">
              <Button onClick={onBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleContinue}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoreProfile;