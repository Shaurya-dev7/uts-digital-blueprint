import React from "react";
import { useFormContext } from "react-hook-form";
import { QuoteFormValues } from "../MultiStepQuoteForm";

export function ProductSelectionStep() {
  const { register, formState: { errors } } = useFormContext<QuoteFormValues>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">Product Selection</h3>
        <p className="text-slate-500 mt-1">Select the categories and provide basic requirements.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Product Category *</label>
          <select 
            {...register("category")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors bg-white"
          >
            <option value="">Select Category</option>
            <option value="valves">Industrial Valves</option>
            <option value="pumps">Pumps & Motors</option>
            <option value="electrical">Electrical & Controls</option>
            <option value="chemicals">Construction Chemicals</option>
            <option value="agriculture">Agriculture Equipment</option>
            <option value="safety">Safety & PPE</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Specific Product (Optional)</label>
          <input 
            {...register("product")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="e.g. API Safety Valve"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Preferred Brand (Optional)</label>
          <input 
            {...register("brand")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="e.g. LESER, KSB"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Estimated Quantity (Optional)</label>
          <input 
            {...register("quantity")}
            type="text"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="e.g. 50 units"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Estimated Budget (Optional)</label>
          <select 
            {...register("budget")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors bg-white"
          >
            <option value="">Select Budget Range</option>
            <option value="under-1L">Under ₹1 Lakh</option>
            <option value="1L-5L">₹1 Lakh - ₹5 Lakhs</option>
            <option value="5L-25L">₹5 Lakhs - ₹25 Lakhs</option>
            <option value="above-25L">Above ₹25 Lakhs</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Urgency (Optional)</label>
          <select 
            {...register("urgency")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors bg-white"
          >
            <option value="">Select Timeline</option>
            <option value="immediate">Immediate (1-2 weeks)</option>
            <option value="normal">Normal (3-4 weeks)</option>
            <option value="planning">Planning (1-3 months)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
