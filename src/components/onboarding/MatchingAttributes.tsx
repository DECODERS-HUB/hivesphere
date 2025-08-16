import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, ArrowLeft, Target, Clock, DollarSign } from "lucide-react";
import { UserRole } from "@/pages/Onboarding";

interface MatchingAttributesProps {
  role: UserRole;
  data: any;
  onUpdate: (data: any) => void;
  onContinue: () => void;
  onBack: () => void;
}

const MatchingAttributes = ({ role, data, onUpdate, onContinue, onBack }: MatchingAttributesProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Brand fields - Audience & Targeting
    ageRange: data.ageRange || [18, 45],
    locations: data.locations || [],
    genderPreference: data.genderPreference || "",
    languagePreference: data.languagePreference || [],
    pricePerDeliverable: data.pricePerDeliverable || [5000, 50000],
    
    // Influencer fields - Stats & Offerings
    contentFormats: data.contentFormats || [],
    turnaroundTime: data.turnaroundTime || "",
    collaborationTypes: data.collaborationTypes || [],
    minimumRate: data.minimumRate || 0,
    
    ...data
  });

  const locations = [
    "Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin City",
    "Kaduna", "Jos", "Ilorin", "Aba", "Enugu", "Onitsha"
  ];

  const languages = ["English", "Pidgin", "Yoruba", "Hausa", "Igbo"];

  const contentFormats = [
    "Instagram Reels", "Instagram Stories", "Instagram Posts",
    "TikTok Videos", "YouTube Videos", "YouTube Shorts",
    "Twitter Posts", "LinkedIn Posts", "Blog Posts"
  ];

  const collaborationTypes = ["Paid", "Barter/Exchange", "Affiliate Marketing", "Long-term Partnership"];

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleContinue = () => {
    if (step === 0) {
      setStep(1);
    } else {
      onUpdate(formData);
      onContinue();
    }
  };

  const handleBack = () => {
    if (step === 0) {
      onBack();
    } else {
      setStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              {role === "brand" ? "Audience & Targeting" : "Content & Collaboration"}
              <span className="text-sm font-normal text-muted-foreground ml-auto">
                Step {step + 1} of 2
              </span>
            </CardTitle>
            <p className="text-muted-foreground">
              {step === 0 
                ? (role === "brand" 
                   ? "Tell us about your target audience" 
                   : "What content do you create?")
                : (role === "brand" 
                   ? "Set your budget preferences" 
                   : "Set your rates and availability")
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {role === "brand" ? (
              step === 0 ? (
                // Brand Step A - Audience & Targeting
                <>
                  <div className="space-y-4">
                    <Label>Target Age Range</Label>
                    <div className="px-4">
                      <Slider
                        value={formData.ageRange}
                        onValueChange={(value) => updateField("ageRange", value)}
                        max={65}
                        min={13}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{formData.ageRange[0]} years</span>
                        <span>{formData.ageRange[1]} years</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Top Target Locations (Select up to 3)</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={location}
                            checked={formData.locations.includes(location)}
                            onCheckedChange={() => toggleArrayValue("locations", location)}
                            disabled={!formData.locations.includes(location) && formData.locations.length >= 3}
                          />
                          <Label htmlFor={location} className="text-sm">{location}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender Preference (Optional)</Label>
                    <Select value={formData.genderPreference} onValueChange={(value) => updateField("genderPreference", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="No preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-preference">No Preference</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="mixed">Mixed Audience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language Preference</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={formData.languagePreference.includes(language)}
                            onCheckedChange={() => toggleArrayValue("languagePreference", language)}
                          />
                          <Label htmlFor={language} className="text-sm">{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // Brand Step B - Budget
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Price Range per Deliverable (₦)
                    </Label>
                    <div className="px-4">
                      <Slider
                        value={formData.pricePerDeliverable}
                        onValueChange={(value) => updateField("pricePerDeliverable", value)}
                        max={500000}
                        min={1000}
                        step={1000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>₦{formData.pricePerDeliverable[0].toLocaleString()}</span>
                        <span>₦{formData.pricePerDeliverable[1].toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Set realistic ranges — you can change later.
                    </p>
                  </div>
                </div>
              )
            ) : (
              step === 0 ? (
                // Influencer Step A - Content & Offerings
                <>
                  <div className="space-y-2">
                    <Label>Content Formats You Create</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {contentFormats.map((format) => (
                        <div key={format} className="flex items-center space-x-2">
                          <Checkbox
                            id={format}
                            checked={formData.contentFormats.includes(format)}
                            onCheckedChange={() => toggleArrayValue("contentFormats", format)}
                          />
                          <Label htmlFor={format} className="text-sm">{format}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      <Clock className="w-4 h-4 inline mr-1" />
                      Average Turnaround Time
                    </Label>
                    <Select value={formData.turnaroundTime} onValueChange={(value) => updateField("turnaroundTime", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select turnaround time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24-hours">24 Hours</SelectItem>
                        <SelectItem value="2-3-days">2-3 Days</SelectItem>
                        <SelectItem value="1-week">1 Week</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                        <SelectItem value="custom">Custom (Discuss)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Collaboration Types You Accept</Label>
                    <div className="space-y-2">
                      {collaborationTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={formData.collaborationTypes.includes(type)}
                            onCheckedChange={() => toggleArrayValue("collaborationTypes", type)}
                          />
                          <Label htmlFor={type} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // Influencer Step B - Rates
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Minimum Rate per Deliverable (₦)
                    </Label>
                    <Input
                      type="number"
                      placeholder="5000"
                      value={formData.minimumRate}
                      onChange={(e) => updateField("minimumRate", parseInt(e.target.value) || 0)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Set realistic rates — you can change later.
                    </p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm font-medium">Market Suggestion</p>
                      <p className="text-xs text-muted-foreground">
                        Based on your niche and follower count, similar influencers charge ₦8,000-15,000 per post.
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}

            <div className="flex justify-between pt-4">
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleContinue}>
                {step === 0 ? "Next Step" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchingAttributes;