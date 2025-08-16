import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Upload, X, Image, FileText, ExternalLink, Star } from "lucide-react";
import { UserRole } from "@/pages/Onboarding";

interface PortfolioUploadProps {
  role: UserRole;
  data: any[];
  onUpdate: (data: any[]) => void;
  onContinue: () => void;
  onSkip: () => void;
  onBack: () => void;
}

interface PortfolioItem {
  id: string;
  type: 'image' | 'link' | 'brief';
  content: string;
  title?: string;
  description?: string;
}

const PortfolioUpload = ({ role, data, onUpdate, onContinue, onSkip, onBack }: PortfolioUploadProps) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(data || []);
  const [dragActive, setDragActive] = useState(false);
  const [campaignBrief, setCampaignBrief] = useState("");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/') && portfolioItems.length < 5) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newItem: PortfolioItem = {
            id: Date.now().toString() + Math.random(),
            type: 'image',
            content: e.target?.result as string,
            title: file.name
          };
          setPortfolioItems(prev => [...prev, newItem]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const addLink = () => {
    const url = prompt("Enter the URL of your work:");
    if (url && portfolioItems.length < 5) {
      const newItem: PortfolioItem = {
        id: Date.now().toString(),
        type: 'link',
        content: url,
        title: "Portfolio Link"
      };
      setPortfolioItems(prev => [...prev, newItem]);
    }
  };

  const removeItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  const handleContinue = () => {
    onUpdate(portfolioItems);
    onContinue();
  };

  const handleSkip = () => {
    onUpdate([]);
    onSkip();
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {role === 'brand' ? 'Brand Assets' : 'Portfolio Showcase'}
              <Badge variant="secondary" className="ml-auto">Optional</Badge>
            </CardTitle>
            <p className="text-muted-foreground">
              {role === 'brand' 
                ? 'Upload brand assets and sample campaign briefs to help influencers understand your brand better.'
                : 'Showcase your best work to attract brands. Upload up to 5 examples of your content.'
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-md p-4">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Boost Your Profile</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {role === 'brand'
                      ? 'Brands with portfolio assets get 60% more quality applications from influencers.'
                      : 'Profiles with portfolio items get matched 3× more often and receive higher-paying opportunities.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Drag & drop {role === 'brand' ? 'brand assets' : 'portfolio images'} here
              </h3>
              <p className="text-muted-foreground mb-4">
                or choose files from your computer
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-input')?.click()}
                  disabled={portfolioItems.length >= 5}
                >
                  <Image className="w-4 h-4 mr-2" />
                  Upload Images
                </Button>
                <Button
                  variant="outline"
                  onClick={addLink}
                  disabled={portfolioItems.length >= 5}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>

              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />

              <p className="text-xs text-muted-foreground mt-2">
                {portfolioItems.length}/5 items • PNG, JPG up to 10MB each
              </p>
            </div>

            {/* Portfolio Items */}
            {portfolioItems.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Your {role === 'brand' ? 'Assets' : 'Portfolio'}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {portfolioItems.map((item) => (
                    <div key={item.id} className="relative group">
                      <div className="aspect-square bg-muted rounded-md overflow-hidden">
                        {item.type === 'image' ? (
                          <img
                            src={item.content}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-3">
                            <ExternalLink className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="text-xs text-center truncate w-full">
                              {item.title}
                            </p>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Campaign Brief for Brands */}
            {role === 'brand' && (
              <div className="space-y-2">
                <Label htmlFor="campaign-brief">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Sample Campaign Brief (Optional)
                </Label>
                <Textarea
                  id="campaign-brief"
                  placeholder="Describe a typical campaign you might run... e.g., 'Looking for lifestyle influencers to showcase our new eco-friendly water bottles. Content should highlight sustainability and daily use cases.'"
                  value={campaignBrief}
                  onChange={(e) => setCampaignBrief(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  This helps influencers understand your typical campaign style and requirements.
                </p>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button onClick={onBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="flex gap-2">
                <Button onClick={handleSkip} variant="ghost">
                  Skip for now
                </Button>
                <Button onClick={handleContinue}>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioUpload;