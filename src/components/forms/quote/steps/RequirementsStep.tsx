import React from "react";
import { useFormContext } from "react-hook-form";
import { QuoteFormValues } from "../MultiStepQuoteForm";
import { Upload, FileType2 } from "lucide-react";

export function RequirementsStep() {
  const { register } = useFormContext<QuoteFormValues>();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">Technical Requirements</h3>
        <p className="text-slate-500 mt-1">Provide detailed specifications or upload relevant drawings.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Technical Specifications (Optional)</label>
        <textarea 
          {...register("technicalSpecs")}
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors resize-none"
          placeholder="Detailed specs, materials, standards, dimensions, etc..."
        />
      </div>

      {/* Placeholder for future file uploads */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">Attachments (Optional - Future Architecture)</label>
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 cursor-not-allowed opacity-70">
          <div className="flex justify-center mb-3">
            <Upload className="w-8 h-8 text-slate-400" />
          </div>
          <p className="font-medium text-slate-700 mb-1">Upload Engineering Drawings or Specs</p>
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
            <FileType2 className="w-3 h-3" /> Supports PDF, DWG, DOCX (Max 10MB)
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Additional Notes (Optional)</label>
        <textarea 
          {...register("additionalNotes")}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors resize-none"
          placeholder="Any other comments or requests..."
        />
      </div>
    </div>
  );
}
