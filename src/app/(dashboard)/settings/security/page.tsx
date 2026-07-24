import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserSessions } from "@/server/auth/session-manager";
import { SessionCard } from "@/components/security/SessionCard";
import { ShieldAlert, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Settings",
  description: "Manage your account security and active sessions.",
};

export default async function SecurityPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  const sessions = await getUserSessions(user.id);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Security Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your password and active sessions across devices.
        </p>
      </div>

      {/* Password Change Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <KeyRound className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
            <p className="text-sm text-gray-500">Update your password to keep your account secure.</p>
          </div>
        </div>
        
        <div className="p-6">
          <form className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="pt-2">
              <button
                type="button"
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Active Sessions Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Active Sessions</h2>
              <p className="text-sm text-gray-500">Devices that are currently logged in to your account.</p>
            </div>
          </div>
          {sessions.length > 1 && (
            <button className="text-sm font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
              Sign out all other devices
            </button>
          )}
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {sessions.map((s) => (
              <SessionCard 
                key={s.id} 
                session={{
                  ...s,
                  isCurrent: s.token === session.session.token
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
