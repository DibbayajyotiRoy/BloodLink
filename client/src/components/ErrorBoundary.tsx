import React, { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Add your error reporting service here
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Alert variant="destructive" className="max-w-lg">
            <XCircle className="h-6 w-6" />
            <AlertTitle className="text-lg font-semibold mb-2">
              Something went wrong
            </AlertTitle>
            <AlertDescription className="space-y-4">
              <p className="text-sm text-gray-600">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Component Stack:</p>
                  <pre className="text-xs bg-gray-900 text-white p-4 rounded overflow-auto max-h-48">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
              <div className="mt-6">
                <Button 
                  onClick={this.handleReset}
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;