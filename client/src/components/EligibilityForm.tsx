"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MedicalHistoryStep from "./ui/MedicalHistoryStep";
import TransfusionStep from "./ui/TransfusionStep";
import EligibilityResult from "./EligibilityResult";
import NotEligiblePage from "./NotEligible";

const ui = [MedicalHistoryStep, TransfusionStep];

export default function EligibilityForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: "",
    hasDisease: false,
    transfusionDate: null,
  });
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const CurrentStepComponent = ui[currentStep];

  const handleNext = () => {
    if (isCurrentStepValid()) {
      if (currentStep < ui.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        checkEligibility();
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  const checkEligibility = () => {
    const { gender, hasDisease, transfusionDate } = formData;

    // Automatically set hemoglobin level based on gender
    const hemoglobinThreshold = gender === "female" ? 12.5 : 13.0; // Threshold values
    const hemoglobinLevel = getHemoglobinLevel(gender); // Automatically get hemoglobin level

    const isHemoglobinOk = hemoglobinLevel >= hemoglobinThreshold;
    const isTransfusionOk =
      !transfusionDate || new Date(transfusionDate) <= new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    setIsEligible(isHemoglobinOk && !hasDisease && isTransfusionOk);
  };

  // Function to automatically determine hemoglobin level based on gender
  const getHemoglobinLevel = (gender: string): number => {
    // Replace with actual logic to determine hemoglobin level if needed
    return gender === "female" ? 13.5 : 14.5; // Example values for automatic determination
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.gender; // Only check if gender is provided
      case 1:
        return !formData.hasDisease; // Check for disease in the second step
      default:
        return false;
    }
  };

  if (formData.hasDisease) {
    return <NotEligiblePage reason="medical condition" />;
  }

  if (isEligible !== null) {
    return <EligibilityResult isEligible={isEligible} />;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          Step {currentStep + 1} of {ui.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CurrentStepComponent formData={formData} updateFormData={updateFormData} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!isCurrentStepValid()}>
          {currentStep === ui.length - 1 ? "Check Eligibility" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
