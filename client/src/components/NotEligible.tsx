import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"

export default function NotEligiblePage({ reason }: { reason: string }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Eligibility Result</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          <p className="text-xl font-semibold">We're sorry, you are not eligible to donate blood at this time.</p>
          <p>Reason: {reason}</p>
          <p>Please consult with your healthcare provider for more information.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild variant="outline">
          <Link to="/">Return to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

