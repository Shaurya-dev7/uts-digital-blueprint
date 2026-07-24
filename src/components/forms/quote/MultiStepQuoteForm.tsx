"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { BusinessInfoStep } from "./steps/BusinessInfoStep";
import { ProductSelectionStep } from "./steps/ProductSelectionStep";
import { RequirementsStep } from "./steps/RequirementsStep";
import { ReviewStep } from "./steps/ReviewStep";
import { ChevronRight, FileText, CheckCircle2 } from "lucide-react";
import { FormSuccess } from "@/components/ui/form-success";

export const quoteFormSchema = z.object({
  // Step 1
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone is required"),
  gst: z.string().optional(),
  
  // Step 2
  industry: z.string().min(2, "Industry is required"),
  location: z.string().min(2, "Location is required"),
  application: z.string().optional(),
  projectType: z.string().optional(),
  
  // Step 3
  category: z.string().min(2, "Category is required"),
  product: z.string().optional(),
  brand: z.string().optional(),
  quantity: z.string().optional(),
  budget: z.string().optional(),
  urgency: z.string().optional(),
  deliveryLocation: z.string().optional(),
  
  // Step 4
  technicalSpecs: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const STEPS = [
  { id: 1, title: "Personal" },
  { id: 2, title: "Business" },
  { id: 3, title: "Products" },
  { id: 4, title: "Requirements" },
  { id: 5, title: "Review" },
];

export function MultiStepQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "", company: "", email: "", phone: "", gst: "",
      industry: "", location: "", application: "", projectType: "",
      category: "", product: "", brand: "", quantity: "", budget: "", urgency: "", deliveryLocation: "",
      technicalSpecs: "", additionalNotes: ""
    }
  });

  const { handleSubmit, trigger } = methods;

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 1) fieldsToValidate = ['name', 'company', 'email', 'phone'];
    if (currentStep === 2) fieldsToValidate = ['industry', 'location'];
    if (currentStep === 3) fieldsToValidate = ['category'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <FormSuccess 
        title="Quote Request Submitted!"
        description="Thank you. Your request has been routed to our enterprise sales team. We will contact you within 24 hours."
        buttonText="Submit Another Request"
        onReset={() => {
          methods.reset();
          setIsSuccess(false);
          setCurrentStep(1);
        }}
        className="max-w-2xl mx-auto shadow-lg bg-white"
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden max-w-4xl mx-auto">
      
      {/* Header & Progress */}
      <div className="bg-slate-50 border-b border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#F97316]/10 p-2 rounded-lg">
            <FileText className="w-6 h-6 text-[#F97316]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Request a Quote</h2>
            <p className="text-slate-500 text-sm">Step {currentStep} of {STEPS.length}: {STEPS[currentStep-1].title}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#F97316] rounded-full -z-10 transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((step) => (
            <div 
              key={step.id} 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 shadow-sm
                ${currentStep >= step.id ? 'bg-[#F97316] text-white border-2 border-white' : 'bg-slate-100 text-slate-400 border-2 border-slate-200'}`}
            >
              {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-10">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="min-h-[300px]">
              {currentStep === 1 && <PersonalInfoStep />}
              {currentStep === 2 && <BusinessInfoStep />}
              {currentStep === 3 && <ProductSelectionStep />}
              {currentStep === 4 && <RequirementsStep />}
              {currentStep === 5 && <ReviewStep />}
            </div>

            {/* Navigation */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Back
              </button>
              
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center bg-slate-900 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center bg-[#F97316] text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-[#ea580c] transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              )}
            </div>

          </form>
        </FormProvider>
      </div>

    </div>
  );
}
