import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Shield, ExternalLink, CheckCircle, Globe, Instagram, Youtube } from "lucide-react";
import { UserRole } from "@/pages/Onboarding";

interface TrustVerificationProps {
  role: UserRole;
  data: any;
  onUpdate: (data: any) => void;
  onContinue: () => void;
  onBack: () => void;
}

const TrustVerification = ({ role, data, onUpdate, onContinue, onBack }: TrustVerificationProps) => {
  const [formData, setFormData] = useState({
    website: data.website || "",
    instagram: data.instagram || "",
    youtube: data.youtube || "",
    tiktok: data.tiktok || "",
    twitter: data.twitter || "",
    linkedin: data.linkedin || "",
    verified: data.verified || false,
    ...data
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateURL = (url: string, platform: string) => {
    if (!url) return true;
    
    const patterns: Record<string, RegExp> = {
      website: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
      instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
      youtube: /^https?:\/\/(www\.)?youtube\.com\/(channel\/|c\/|user\/|@)[a-zA-Z0-9_-]+\/?$/,
      tiktok: /^https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9_.]+\/?$/,
      twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/,
      linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/,
    };

    return patterns[platform]?.test(url) || false;
  };

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};
    
    // Check if at least one social link is provided
    const socialLinks = [formData.website, formData.instagram, formData.youtube, formData.tiktok, formData.twitter, formData.linkedin];
    const hasAtLeastOneLink = socialLinks.some(link => link.trim());
    
    if (!hasAtLeastOneLink) {
      newErrors.general = "Please add at least one social link for verification";
    }

    // Validate URL formats
    Object.keys(formData).forEach(field => {
      if (field !== 'verified' && formData[field] && !validateURL(formData[field], field)) {
        newErrors[field] = `Please enter a valid ${field} URL`;
      }
    });

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onUpdate(formData);
      onContinue();
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'website':
        return <Globe className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const socialFields = [
    { key: 'website', label: role === 'brand' ? 'Company Website' : 'Personal Website', placeholder: 'https://yoursite.com', required: role === 'brand' },
    { key: 'instagram', label: 'Instagram Profile', placeholder: 'https://instagram.com/yourusername' },
    { key: 'youtube', label: 'YouTube Channel', placeholder: 'https://youtube.com/@yourchannel' },
    { key: 'tiktok', label: 'TikTok Profile', placeholder: 'https://tiktok.com/@yourusername' },
    { key: 'twitter', label: 'X (Twitter) Profile', placeholder: 'https://x.com/yourusername' },
    { key: 'linkedin', label: 'LinkedIn Profile', placeholder: 'https://linkedin.com/in/yourprofile' },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Trust & Verification
            </CardTitle>
            <p className="text-muted-foreground">
              Add social links so {role === 'brand' ? 'influencers' : 'brands'} can verify your work. 
              This boosts match quality and builds trust.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {errors.general && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-sm text-destructive">{errors.general}</p>
              </div>
            )}

            <div className="bg-primary/10 border border-primary/20 rounded-md p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Why we ask for social links</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Social links help {role === 'brand' ? 'influencers' : 'brands'} verify your authenticity 
                    and see examples of your work. This increases your match rate by up to 3×.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {socialFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key} className="flex items-center gap-2">
                    {getSocialIcon(field.key)}
                    {field.label}
                    {field.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
                  </Label>
                  <Input
                    id={field.key}
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    className={errors[field.key] ? "border-destructive" : ""}
                  />
                  {errors[field.key] && (
                    <p className="text-sm text-destructive">{errors[field.key]}</p>
                  )}
                  {formData[field.key] && validateURL(formData[field.key], field.key) && (
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <CheckCircle className="w-3 h-3" />
                      Valid URL format
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Verification Process</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We'll check that your social profiles are active and authentic</li>
                <li>• Verified profiles get priority in matching algorithms</li>
                <li>• You can add more links later to increase your verification level</li>
                <li>• Manual verification available for high-volume accounts</li>
              </ul>
              <Button variant="outline" size="sm" className="mt-3">
                Learn about verification
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

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

export default TrustVerification;