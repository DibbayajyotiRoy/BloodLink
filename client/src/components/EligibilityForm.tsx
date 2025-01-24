"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MedicalHistoryStep from "./ui/MedicalHistoryStep";
import TransfusionStep from "./ui/TransfusionStep";
import EligibilityResult from "./EligibilityResult";
import NotEligiblePage from "./NotEligible";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ui = [MedicalHistoryStep, TransfusionStep];

export default function EligibilityForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    hasDisease: false,
    transfusionDate: null,
    noneOfTheAbove: false,
  });
  const [pendingData, setPendingData] = useState({}); // Temporarily store form changes
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const CurrentStepComponent = ui[currentStep];

  const handleNext = async () => {
    console.log("Current Step:", currentStep); // Debug: Current step
    console.log("Pending Data:", pendingData); // Debug: Pending changes
    const updatedFormData = { ...formData, ...pendingData };
    console.log("Updated Form Data:", updatedFormData); // Debug: Updated data
  
    if (isCurrentStepValid(updatedFormData)) {
      console.log("Current step is valid");
      if (updatedFormData.noneOfTheAbove) {
        console.log("None of the Above is selected");
        const donorId = localStorage.getItem("donorId");
        if (donorId) {
          console.log("Sending request to backend...");
          try {
            const response = await axios.put("http://localhost:3000/blooddonor/eligibility", { donorId });
            console.log("Response from backend:", response.data);
            localStorage.removeItem("donorId");
          } catch (error) {
            console.error("Error sending eligibility data:", error);
          }
        }
        navigate("/login");
      } else {
        console.log("Navigating to the next step");
        if (currentStep < ui.length - 1) {
          setCurrentStep(currentStep + 1);
          setPendingData({});
        } else {
          navigate("/login");
        }
      }
    } else {
      console.log("Current step is invalid");
    }
  };
  
  
  

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setPendingData({}); // Clear pending changes when going back
  };

  const updateFormData = (newData: Partial<typeof formData>) => {
    setPendingData(newData); // Store changes temporarily
  };

  const isCurrentStepValid = (data: typeof formData) => {
    switch (currentStep) {
      case 0:
        return true; // First step always valid
      case 1:
        return data.noneOfTheAbove || !data.hasDisease; // Check "None of the Above" or no disease
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
        <CurrentStepComponent
          formData={{ ...formData, ...pendingData }} // Include pending changes for the current step
          updateFormData={updateFormData}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStep === ui.length - 1 ? "Login" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
