import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import RoleReconfirm from "@/components/onboarding/RoleReconfirm";
import CoreProfile from "@/components/onboarding/CoreProfile";
import MatchingAttributes from "@/components/onboarding/MatchingAttributes";
import TrustVerification from "@/components/onboarding/TrustVerification";
import PortfolioUpload from "@/components/onboarding/PortfolioUpload";
import ProfileCompleteness from "@/components/onboarding/ProfileCompleteness";
import QuickTutorial from "@/components/onboarding/QuickTutorial";
import FirstAction from "@/components/onboarding/FirstAction";
import Confirmation from "@/components/onboarding/Confirmation";
import { Progress } from "@/components/ui/progress";

export type UserRole = "brand" | "influencer";

export interface OnboardingData {
  role: UserRole;
  coreProfile: any;
  matchingAttributes: any;
  trustData: any;
  portfolio: any[];
  completeness: number;
}

const Onboarding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    role: (searchParams.get("role") as UserRole) || "brand",
    coreProfile: {},
    matchingAttributes: {},
    trustData: {},
    portfolio: [],
    completeness: 0
  });

  const steps = [
    "Welcome",
    "Role Confirm", 
    "Core Profile",
    "Matching Attributes",
    "Trust & Verification",
    "Portfolio Upload",
    "Profile Review",
    "Tutorial",
    "First Action",
    "Confirmation"
  ];

  // Auto-save progress to localStorage
  useEffect(() => {
    localStorage.setItem("hivesphere_onboarding", JSON.stringify({
      ...onboardingData,
      currentStep,
      timestamp: Date.now()
    }));
  }, [onboardingData, currentStep]);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem("hivesphere_onboarding");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Only restore if less than 24 hours old
        if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
          setOnboardingData(data);
          setCurrentStep(data.currentStep || 0);
        }
      } catch (e) {
        console.error("Failed to load saved onboarding data:", e);
      }
    }
  }, []);

  const updateData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipToEnd = () => {
    setCurrentStep(steps.length - 2); // Go to first action
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen onContinue={nextStep} onSkip={skipToEnd} />;
      case 1:
        return <RoleReconfirm 
          currentRole={onboardingData.role} 
          onRoleChange={(role) => updateData({ role })}
          onContinue={nextStep} 
        />;
      case 2:
        return <CoreProfile 
          role={onboardingData.role}
          data={onboardingData.coreProfile}
          onUpdate={(data) => updateData({ coreProfile: data })}
          onContinue={nextStep}
          onBack={prevStep}
        />;
      case 3:
        return <MatchingAttributes 
          role={onboardingData.role}
          data={onboardingData.matchingAttributes}
          onUpdate={(data) => updateData({ matchingAttributes: data })}
          onContinue={nextStep}
          onBack={prevStep}
        />;
      case 4:
        return <TrustVerification 
          role={onboardingData.role}
          data={onboardingData.trustData}
          onUpdate={(data) => updateData({ trustData: data })}
          onContinue={nextStep}
          onBack={prevStep}
        />;
      case 5:
        return <PortfolioUpload 
          role={onboardingData.role}
          data={onboardingData.portfolio}
          onUpdate={(data) => updateData({ portfolio: data })}
          onContinue={nextStep}
          onSkip={nextStep}
          onBack={prevStep}
        />;
      case 6:
        return <ProfileCompleteness 
          data={onboardingData}
          onContinue={nextStep}
          onBack={prevStep}
        />;
      case 7:
        return <QuickTutorial 
          role={onboardingData.role}
          onContinue={nextStep}
          onSkip={nextStep}
        />;
      case 8:
        return <FirstAction 
          role={onboardingData.role}
          data={onboardingData}
          onComplete={nextStep}
        />;
      case 9:
        return <Confirmation 
          role={onboardingData.role}
          onFinish={() => {
            localStorage.removeItem("hivesphere_onboarding");
            navigate(onboardingData.role === "brand" ? "/brand-dashboard" : "/influencer-dashboard");
          }}
        />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      {currentStep > 0 && currentStep < steps.length - 1 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b p-4">
          <div className="container max-w-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length - 2}
              </span>
              <span className="text-sm font-medium">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${currentStep > 0 && currentStep < steps.length - 1 ? 'pt-24' : ''}`}>
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;