import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function TransfusionStep({ formData, updateFormData }) {
  return (
    <div className="space-y-4">
      <p className="font-medium">
        If you have received a transfusion of blood or a blood product, please enter the date of the transfusion:
      </p>
      <div>
        <Label htmlFor="transfusionDate">Transfusion Date</Label>
        <Input
          id="transfusionDate"
          type="date"
          value={formData.transfusionDate || ""}
          onChange={(e) => updateFormData({ transfusionDate: e.target.value })}
          className="mt-1"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Leave this field blank if you have not received a blood transfusion.
      </p>
    </div>
  )
}

