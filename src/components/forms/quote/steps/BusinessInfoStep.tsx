import React from "react";
import { useFormContext } from "react-hook-form";
import { QuoteFormValues } from "../MultiStepQuoteForm";

export function BusinessInfoStep() {
  const { register, formState: { errors } } = useFormContext<QuoteFormValues>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">Business Details</h3>
        <p className="text-slate-500 mt-1">Tell us about your industry and project location.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Industry *</label>
          <select 
            {...register("industry")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors bg-white"
          >
            <option value="">Select Industry</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="construction">Construction & Infrastructure</option>
            <option value="agriculture">Agriculture</option>
            <option value="other">Other</option>
          </select>
          {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Project Location *</label>
          <input 
            {...register("location")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="City, State, ZIP"
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Application (Optional)</label>
          <input 
            {...register("application")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="e.g. Boiler Feed, Water Treatment"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Project Type (Optional)</label>
          <select 
            {...register("projectType")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors bg-white"
          >
            <option value="">Select Type</option>
            <option value="new">New Installation</option>
            <option value="replacement">Replacement / Upgrade</option>
            <option value="maintenance">Maintenance Spares</option>
            <option value="stock">Regular Stock</option>
          </select>
        </div>
      </div>
    </div>
  );
}
