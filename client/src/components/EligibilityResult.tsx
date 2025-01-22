import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function EligibilityResult({ isEligible }: { isEligible: boolean }) {
  const navigate = useNavigate(); 

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Eligibility Result</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {isEligible ? (
          <div className="space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <p className="text-xl font-semibold">You are eligible to donate blood!</p>
            <p>Please proceed to the registration form to schedule your donation.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <p className="text-xl font-semibold">We're sorry, you are not eligible to donate blood at this time.</p>
            <p>Please consult with your healthcare provider for more information.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {isEligible ? (
          <Button asChild>
            <Link to="/register/donor">Proceed to Registration</Link>
          </Button>
        ) : (
          <p >
            Return to Home
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
