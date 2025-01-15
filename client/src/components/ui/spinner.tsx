import React from "react";

interface SpinnerProps {
  size?: "sm" | "lg";
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "sm" }) => {
  const sizeClasses = size === "sm" ? "h-5 w-5" : "h-8 w-8"; // Adjust size

  return (
    <div
      className={`animate-spin border-4 border-t-transparent border-blue-500 rounded-full ${sizeClasses}`}
    />
  );
};
