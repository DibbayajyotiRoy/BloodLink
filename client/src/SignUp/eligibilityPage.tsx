import EligibilityForm from "@/components/EligibilityForm"
import NotEligiblePage from "@/components/NotEligiblePage"

export default function EligibilityPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Blood Donation Eligibility Check</h1>
      <EligibilityForm />
    </div>
  )
}

