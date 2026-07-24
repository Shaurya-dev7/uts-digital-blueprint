import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { FileText, Download, Users, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Universal Techno Services dashboard.",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  const isAdmin = user.role === "admin" || user.role === "super_admin";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back, {user.name.split(" ")[0]}!
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <FileText className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Active Quotes</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <Download className="w-5 h-5 text-emerald-500" />
            <h3 className="font-medium">Downloads</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>

        {isAdmin && (
          <>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3 text-gray-500">
                <Users className="w-5 h-5 text-orange-500" />
                <h3 className="font-medium">Total Users</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">1,248</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3 text-gray-500">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <h3 className="font-medium">Revenue (YTD)</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">₹42L</p>
            </div>
          </>
        )}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6 text-center text-gray-500">
          <p>No recent activity to show.</p>
        </div>
      </div>
    </div>
  );
}
