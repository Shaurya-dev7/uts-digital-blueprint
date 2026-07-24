import React from "react";
import { useFormContext } from "react-hook-form";
import { QuoteFormValues } from "../MultiStepQuoteForm";
import { CheckCircle } from "lucide-react";

export function ReviewStep() {
  const { getValues } = useFormContext<QuoteFormValues>();
  const values = getValues();

  const sections = [
    {
      title: "Personal Information",
      data: [
        { label: "Name", value: values.name },
        { label: "Company", value: values.company },
        { label: "Email", value: values.email },
        { label: "Phone", value: values.phone },
        { label: "GST", value: values.gst || "N/A" }
      ]
    },
    {
      title: "Business Details",
      data: [
        { label: "Industry", value: values.industry },
        { label: "Location", value: values.location },
        { label: "Application", value: values.application || "N/A" },
        { label: "Project Type", value: values.projectType || "N/A" }
      ]
    },
    {
      title: "Product Selection",
      data: [
        { label: "Category", value: values.category },
        { label: "Product", value: values.product || "N/A" },
        { label: "Preferred Brand", value: values.brand || "N/A" },
        { label: "Quantity", value: values.quantity || "N/A" },
        { label: "Budget", value: values.budget || "N/A" },
        { label: "Urgency", value: values.urgency || "N/A" }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">Review Your Request</h3>
        <p className="text-slate-500 mt-1">Please ensure all details are correct before submitting.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-700 mb-4 pb-2 border-b border-slate-200">{section.title}</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {section.data.map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{item.label}</span>
                  <span className="text-sm font-medium text-slate-800 capitalize">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {(values.technicalSpecs || values.additionalNotes) && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-700 mb-4 pb-2 border-b border-slate-200">Requirements & Notes</h4>
            {values.technicalSpecs && (
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Technical Specs</span>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{values.technicalSpecs}</p>
              </div>
            )}
            {values.additionalNotes && (
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Additional Notes</span>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{values.additionalNotes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
        <div>
          <h4 className="font-bold text-emerald-900 text-sm">Ready to Submit</h4>
          <p className="text-sm text-emerald-700 mt-1">Click submit below to send your request. Our enterprise sales team will review and respond within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}
