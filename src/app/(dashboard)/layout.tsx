import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { LayoutDashboard, Users, Shield, UserCircle, LogOut, FileText, Settings, Bell } from "lucide-react";
import { RoleBadge } from "@/components/admin/RoleBadge";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  const role = user.role as string;
  const isAdmin = role === "admin" || role === "super_admin";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0A192F] text-white flex flex-col shrink-0">
        <div className="p-4 flex items-center gap-3 border-b border-gray-800">
          <div className="w-8 h-8 rounded bg-[#F97316] flex items-center justify-center font-bold text-white">
            U
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">UTS Portal</h1>
            <p className="text-gray-400 text-xs">v1.0</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4">
            Overview
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/quotes"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            My Quotes
          </Link>

          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">
            Account
          </p>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <UserCircle className="w-4 h-4" />
            Profile
          </Link>
          <Link
            href="/settings/security"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Shield className="w-4 h-4" />
            Security
          </Link>

          {isAdmin && (
            <>
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">
                Administration
              </p>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                User Management
              </Link>
              <Link
                href="/admin/roles"
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Shield className="w-4 h-4" />
                Roles & Permissions
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-900 hidden sm:block">
            {role === "admin" || role === "super_admin" ? "Admin Console" : "Customer Portal"}
          </h2>
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <div className="mt-0.5">
                  <RoleBadge role={role} size="sm" />
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
