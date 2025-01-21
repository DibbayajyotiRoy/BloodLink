import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const medicalConditions = [
  { id: "hiv", label: "HIV/AIDS or increased exposure to HIV/AIDS virus" },
  { id: "hepatitis", label: "Hepatitis B or C" },
  { id: "cancer", label: "Hodgkin's disease, leukemia, lymphoma or malignant melanoma" },
  { id: "tuberculosis", label: "Active tuberculosis" },
  { id: "cjd", label: "vCJD, CJD or any other transmissible spongiform encephalopathies" },
  { id: "growthHormone", label: "Received cadaveric pituitary human growth hormone" },
  { id: "ebola", label: "Ebola virus infection or disease" },
  { id: "none", label: "None of the above" },
]

export default function MedicalHistoryStep({ formData, updateFormData }) {
  const handleCheckboxChange = (condition: string) => {
    if (condition === "none") {
      updateFormData({ hasDisease: false })
    } else {
      updateFormData({ hasDisease: true })
    }
  }

  return (
    <div className="space-y-4">
      <p className="font-medium">Select any conditions that apply to you:</p>
      {medicalConditions.map((condition) => (
        <div key={condition.id} className="flex items-center space-x-2">
          <Checkbox
            id={condition.id}
            checked={condition.id === "none" ? !formData.hasDisease : formData.hasDisease}
            onCheckedChange={() => handleCheckboxChange(condition.id)}
          />
          <Label htmlFor={condition.id}>{condition.label}</Label>
        </div>
      ))}
    </div>
  )
}

