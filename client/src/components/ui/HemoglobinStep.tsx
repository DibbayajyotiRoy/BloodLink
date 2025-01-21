import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function HemoglobinStep({ formData, updateFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Gender</Label>
        <RadioGroup
          value={formData.gender}
          onValueChange={(value) => updateFormData({ gender: value })}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="hemoglobinLevel">Hemoglobin Level (g/dL)</Label>
        <Input
          id="hemoglobinLevel"
          type="number"
          step="0.1"
          value={formData.hemoglobinLevel}
          onChange={(e) => updateFormData({ hemoglobinLevel: e.target.value })}
          className="mt-1"
        />
      </div>
    </div>
  )
}

