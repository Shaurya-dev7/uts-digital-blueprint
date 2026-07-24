import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormSuccessProps {
  title: string;
  description: string;
  buttonText: string;
  onReset: () => void;
  className?: string;
}

export function FormSuccess({ title, description, buttonText, onReset, className = "" }: FormSuccessProps) {
  return (
    <div className={`bg-emerald-50 border border-emerald-200 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px] ${className}`}>
      <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4">{title}</h3>
      <p className="text-emerald-700 text-base md:text-lg max-w-md mb-8">
        {description}
      </p>
      <Button 
        onClick={onReset}
        variant="outline"
        className="border-emerald-200 text-emerald-700 hover:bg-emerald-100 px-8 py-3 h-auto font-semibold"
      >
        {buttonText}
      </Button>
    </div>
  );
}
