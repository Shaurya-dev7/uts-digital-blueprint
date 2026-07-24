"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/ui/form-success";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  designation: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(2, "Location is required"),
  industry: z.string().min(1, "Please select an industry"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  preferredContact: z.enum(["email", "phone", "whatsapp"]),
  agreeToPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function QuickContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredContact: "email",
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: Connect to backend/API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <FormSuccess 
        title="Message Sent Successfully!"
        description="Thank you for reaching out to Universal Techno Services. One of our industrial experts will contact you shortly."
        buttonText="Send Another Message"
        onReset={() => setIsSuccess(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm" id="contact-form">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800">Send an Inquiry</h3>
        <p className="text-slate-500 mt-1">Fill out the form below and we'll get back to you promptly.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <label className="text-sm font-semibold text-slate-700">Location *</label>
            <input 
              {...register("location")}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
              placeholder="City, State"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Subject *</label>
          <input 
            {...register("subject")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors"
            placeholder="How can we help you?"
          />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Message *</label>
          <textarea 
            {...register("message")}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-colors resize-none"
            placeholder="Please provide details about your inquiry..."
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <div className="space-y-3 pt-2">
          <label className="text-sm font-semibold text-slate-700">Preferred Contact Method</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="email" {...register("preferredContact")} className="text-[#F97316] focus:ring-[#F97316]" />
              <span className="text-sm text-slate-600">Email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="phone" {...register("preferredContact")} className="text-[#F97316] focus:ring-[#F97316]" />
              <span className="text-sm text-slate-600">Phone Call</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="whatsapp" {...register("preferredContact")} className="text-[#F97316] focus:ring-[#F97316]" />
              <span className="text-sm text-slate-600">WhatsApp</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="space-y-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register("agreeToPolicy")} className="rounded text-[#F97316] focus:ring-[#F97316]" />
              <span className="text-sm text-slate-600">I agree to the <a href="#" className="text-[#F97316] hover:underline">Privacy Policy</a>.</span>
            </label>
            {errors.agreeToPolicy && <p className="text-red-500 text-xs ml-6">{errors.agreeToPolicy.message}</p>}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#F97316] hover:bg-[#ea580c] text-white px-8 h-12"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
