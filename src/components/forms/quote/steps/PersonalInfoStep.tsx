import React from "react";
import { useFormContext } from "react-hook-form";
import { QuoteFormValues } from "../MultiStepQuoteForm";

export function PersonalInfoStep() {
  const { register, formState: { errors } } = useFormContext<QuoteFormValues>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">Personal Information</h3>
        <p className="text-slate-500 mt-1">Please provide your contact details so we can reach you.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full Name *</label>
          <input 
            {...register("name")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Company Name *</label>
          <input 
            {...register("company")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="Tata Steel Ltd."
          />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email Address *</label>
          <input 
            {...register("email")}
            type="email"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="john@company.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Phone Number *</label>
          <input 
            {...register("phone")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold text-slate-700">GST Number (Optional)</label>
          <input 
            {...register("gst")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="e.g. 22AAAAA0000A1Z5"
          />
        </div>
      </div>
    </div>
  );
}
