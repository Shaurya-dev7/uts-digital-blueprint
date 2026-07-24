import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ROLE_DEFINITIONS, RoleName } from "@/server/auth/permissions";
import { RoleBadge } from "@/components/admin/RoleBadge";
import { Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Roles & Permissions",
  description: "Manage system roles and their permissions.",
};

export default async function AdminRolesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || (session.user.role !== "admin" && session.user.role !== "super_admin")) {
    redirect("/dashboard");
  }

  const roles = Object.values(ROLE_DEFINITIONS).sort((a, b) => b.level - a.level);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Roles & Permissions</h1>
        <p className="text-gray-500 mt-1 text-sm">
          View the role hierarchy and access levels across the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {roles.map((role) => (
          <div key={role.name} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <RoleBadge role={role.name} size="md" />
                  {role.isSystem && (
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">System Role</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {role.description}
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5 tooltip" title="Hierarchy Level (higher = more access)">
                  <Shield className="w-4 h-4 text-gray-400" />
                  Level {role.level}
                </div>
              </div>
            </div>
            
            <div className="p-6 md:w-2/3">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Permissions</h3>
              
              {role.permissions.includes("*") ? (
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-800 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Full System Access (Wildcard)</p>
                    <p className="mt-1 opacity-90">This role has unrestricted access to all resources and actions in the system. Assign with extreme caution.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {role.permissions.length === 0 ? (
                    <span className="text-sm text-gray-400 italic">No permissions assigned</span>
                  ) : (
                    role.permissions.map((perm) => {
                      const [resource, action] = perm.split(":");
                      return (
                        <span key={perm} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs text-gray-700 font-medium">
                          <span className="text-gray-500">{resource}</span>
                          <span className="text-gray-300">•</span>
                          <span>{action}</span>
                        </span>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
