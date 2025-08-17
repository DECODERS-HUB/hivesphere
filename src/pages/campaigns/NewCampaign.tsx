import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { CalendarIcon, ArrowLeft, FileText, Target, Users, DollarSign, Calendar, BookOpen, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

const NewCampaign = () => {
  useEffect(() => { document.title = "Create Campaign — HiveSphere" }, []);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    objectives: [] as string[],
    targetAudience: {
      locations: [] as string[],
      ageRanges: [] as string[],
      interests: [] as string[],
      niches: [] as string[]
    },
    budget: {
      total: "",
      perInfluencer: "",
      bonusEnabled: false
    },
    schedule: {
      startDate: "",
      endDate: "",
      submissionDeadline: ""
    },
    guidelines: "",
    hashtags: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const objectiveOptions = [
    { id: "awareness", label: "Brand Awareness", description: "Increase brand visibility and recognition" },
    { id: "engagement", label: "Engagement", description: "Drive likes, comments, and shares" },
    { id: "sales", label: "Sales & Conversions", description: "Generate direct sales and leads" },
    { id: "launch", label: "Product Launch", description: "Announce new products or services" },
    { id: "content", label: "Content Creation", description: "Generate authentic user content" }
  ];

  const locationOptions = ["Nigeria", "Ghana", "Kenya", "South Africa", "United States", "United Kingdom", "Canada"];
  const ageOptions = ["13-17", "18-24", "25-34", "35-44", "45-54", "55+"];
  const nicheOptions = ["Fashion", "Beauty", "Tech", "Food", "Travel", "Fitness", "Lifestyle", "Gaming"];
  const interestOptions = ["Shopping", "Sports", "Music", "Movies", "Art", "Business", "Health", "Education"];

  const handleObjectiveChange = (objectiveId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      objectives: checked 
        ? [...prev.objectives, objectiveId]
        : prev.objectives.filter(id => id !== objectiveId)
    }));
  };

  const handleTargetAudienceChange = (category: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        [category]: checked
          ? [...prev.targetAudience[category as keyof typeof prev.targetAudience], value]
          : prev.targetAudience[category as keyof typeof prev.targetAudience].filter((item: string) => item !== value)
      }
    }));
  };

  const calculateEstimatedInfluencers = () => {
    const totalBudget = parseInt(formData.budget.total) || 0;
    const perInfluencer = parseInt(formData.budget.perInfluencer) || 0;
    return perInfluencer > 0 ? Math.floor(totalBudget / perInfluencer) : 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Final submission
    toast({ 
      title: "Campaign created successfully!", 
      description: "Your campaign is ready to attract the right influencers." 
    });
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const saveDraft = () => {
    toast({ 
      title: "Draft saved", 
      description: "You can continue editing your campaign later." 
    });
  };

  return (
    <DashboardLayout userRole="brand">
      <main className="container max-w-4xl py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard/brand/campaigns" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Create New Campaign</h1>
            <p className="text-muted-foreground">Launch targeted campaigns to find the perfect influencers</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-3 text-xs text-muted-foreground">
              <span className={currentStep >= 1 ? "text-primary" : ""}>Campaign Details</span>
              <span className={currentStep >= 2 ? "text-primary" : ""}>Target Audience</span>
              <span className={currentStep >= 3 ? "text-primary" : ""}>Budget & Schedule</span>
              <span className={currentStep >= 4 ? "text-primary" : ""}>Guidelines</span>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Step 1: Campaign Details */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Campaign Details & Objectives
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Clear campaigns attract the right influencers and deliver better results
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">Campaign Title *</Label>
                    <Input 
                      id="title" 
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Summer Fashion Collection Launch"
                      required 
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Make it compelling and specific</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">Campaign Description *</Label>
                    <Textarea 
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your campaign goals, brand values, and what makes this collaboration special..."
                      className="mt-1 min-h-[100px]"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">Help influencers understand your brand and vision</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Campaign Objectives *</Label>
                  <div className="grid gap-3 md:grid-cols-2">
                    {objectiveOptions.map((objective) => (
                      <div key={objective.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox
                          id={objective.id}
                          checked={formData.objectives.includes(objective.id)}
                          onCheckedChange={(checked) => handleObjectiveChange(objective.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <label htmlFor={objective.id} className="text-sm font-medium cursor-pointer">
                            {objective.label}
                          </label>
                          <p className="text-xs text-muted-foreground">{objective.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Select all that apply to align with measurable results</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Target Audience */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Target Audience & Filters
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Precise targeting ensures your message reaches the right audience efficiently
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Location Targeting</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                      {locationOptions.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location}`}
                            checked={formData.targetAudience.locations.includes(location)}
                            onCheckedChange={(checked) => handleTargetAudienceChange('locations', location, checked as boolean)}
                          />
                          <label htmlFor={`location-${location}`} className="text-sm cursor-pointer">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Age Range</Label>
                    <div className="space-y-2 border rounded-lg p-3">
                      {ageOptions.map((age) => (
                        <div key={age} className="flex items-center space-x-2">
                          <Checkbox
                            id={`age-${age}`}
                            checked={formData.targetAudience.ageRanges.includes(age)}
                            onCheckedChange={(checked) => handleTargetAudienceChange('ageRanges', age, checked as boolean)}
                          />
                          <label htmlFor={`age-${age}`} className="text-sm cursor-pointer">
                            {age}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Content Niches</Label>
                    <div className="space-y-2 border rounded-lg p-3">
                      {nicheOptions.map((niche) => (
                        <div key={niche} className="flex items-center space-x-2">
                          <Checkbox
                            id={`niche-${niche}`}
                            checked={formData.targetAudience.niches.includes(niche)}
                            onCheckedChange={(checked) => handleTargetAudienceChange('niches', niche, checked as boolean)}
                          />
                          <label htmlFor={`niche-${niche}`} className="text-sm cursor-pointer">
                            {niche}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Audience Interests</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                      {interestOptions.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={`interest-${interest}`}
                            checked={formData.targetAudience.interests.includes(interest)}
                            onCheckedChange={(checked) => handleTargetAudienceChange('interests', interest, checked as boolean)}
                          />
                          <label htmlFor={`interest-${interest}`} className="text-sm cursor-pointer">
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Budget & Schedule */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Budget & Schedule
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Transparent pricing and clear timelines build trust and attract quality influencers
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="totalBudget" className="text-sm font-medium">Total Campaign Budget (₦) *</Label>
                      <Input 
                        id="totalBudget"
                        type="number"
                        value={formData.budget.total}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          budget: { ...prev.budget, total: e.target.value }
                        }))}
                        placeholder="100000"
                        min="5000"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="perInfluencer" className="text-sm font-medium">Payment per Influencer (₦) *</Label>
                      <Input 
                        id="perInfluencer"
                        type="number"
                        value={formData.budget.perInfluencer}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          budget: { ...prev.budget, perInfluencer: e.target.value }
                        }))}
                        placeholder="10000"
                        min="1000"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bonusEnabled"
                        checked={formData.budget.bonusEnabled}
                        onCheckedChange={(checked) => setFormData(prev => ({ 
                          ...prev, 
                          budget: { ...prev.budget, bonusEnabled: checked as boolean }
                        }))}
                      />
                      <label htmlFor="bonusEnabled" className="text-sm cursor-pointer">
                        Offer performance-based bonuses
                      </label>
                    </div>

                    {/* Budget Summary */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Budget Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Estimated influencers:</span>
                          <span className="font-medium">{calculateEstimatedInfluencers()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total budget:</span>
                          <span className="font-medium">₦{parseInt(formData.budget.total).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Platform fee (10%):</span>
                          <span>₦{(parseInt(formData.budget.total) * 0.1).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="startDate" className="text-sm font-medium">Campaign Start Date *</Label>
                      <Input 
                        id="startDate"
                        type="date"
                        value={formData.schedule.startDate}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          schedule: { ...prev.schedule, startDate: e.target.value }
                        }))}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="endDate" className="text-sm font-medium">Campaign End Date *</Label>
                      <Input 
                        id="endDate"
                        type="date"
                        value={formData.schedule.endDate}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          schedule: { ...prev.schedule, endDate: e.target.value }
                        }))}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="submissionDeadline" className="text-sm font-medium">Content Submission Deadline</Label>
                      <Input 
                        id="submissionDeadline"
                        type="date"
                        value={formData.schedule.submissionDeadline}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          schedule: { ...prev.schedule, submissionDeadline: e.target.value }
                        }))}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">When should influencers submit their content for review?</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Guidelines */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Content Guidelines & Requirements
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Clear guidelines ensure influencer content aligns perfectly with your brand vision
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="guidelines" className="text-sm font-medium">Brand Guidelines & Content Requirements</Label>
                  <Textarea 
                    id="guidelines"
                    value={formData.guidelines}
                    onChange={(e) => setFormData(prev => ({ ...prev, guidelines: e.target.value }))}
                    placeholder="Include details about:
• Brand voice and tone
• Visual style preferences  
• Content format requirements (posts, stories, videos)
• Key messages to include
• Things to avoid
• Technical requirements (image size, video length, etc.)"
                    className="mt-1 min-h-[150px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">The more specific you are, the better the results</p>
                </div>

                <div>
                  <Label htmlFor="hashtags" className="text-sm font-medium">Required Hashtags</Label>
                  <Input 
                    id="hashtags"
                    value={formData.hashtags}
                    onChange={(e) => setFormData(prev => ({ ...prev, hashtags: e.target.value }))}
                    placeholder="#YourBrand #CampaignName #Sponsored"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separate multiple hashtags with spaces</p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Campaign Summary
                  </h4>
                  <div className="grid gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Title:</span>
                      <span className="ml-2 font-medium">{formData.title || "Untitled Campaign"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Objectives:</span>
                      <span className="ml-2">{formData.objectives.length} selected</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target Locations:</span>
                      <span className="ml-2">{formData.targetAudience.locations.length} selected</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="ml-2 font-medium">₦{parseInt(formData.budget.total).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Estimated Reach:</span>
                      <span className="ml-2 font-medium">{calculateEstimatedInfluencers()} influencers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={goBack}>
                  Back
                </Button>
              )}
              <Button type="button" variant="outline" onClick={saveDraft}>
                Save Draft
              </Button>
            </div>
            
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {currentStep === totalSteps ? "Publish Campaign" : "Continue"}
            </Button>
          </div>
        </form>
      </main>
    </DashboardLayout>
  );
};

export default NewCampaign;
