import { PrismaClient } from "@prisma/client";
import { ROLE_DEFINITIONS, ALL_PERMISSIONS } from "../src/server/auth/permissions";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // 1. Seed Permissions
  console.log("Seeding permissions...");
  for (const permName of ALL_PERMISSIONS) {
    const [resource, action] = permName.split(":");
    await prisma.permission.upsert({
      where: { name: permName },
      update: {},
      create: {
        name: permName,
        resource,
        action,
        description: `Allows ${action} on ${resource}`,
      },
    });
  }

  // 2. Seed Roles & Role Permissions
  console.log("Seeding roles and role-permission mappings...");
  for (const roleDef of Object.values(ROLE_DEFINITIONS)) {
    const role = await prisma.role.upsert({
      where: { name: roleDef.name },
      update: {
        description: roleDef.description,
        level: roleDef.level,
        isSystem: roleDef.isSystem,
      },
      create: {
        name: roleDef.name,
        description: roleDef.description,
        level: roleDef.level,
        isSystem: roleDef.isSystem,
      },
    });

    // Clear existing permissions for this role to ensure exact sync
    await prisma.rolePermission.deleteMany({
      where: { roleId: role.id },
    });

    // Resolve wildcards or exact permissions
    const permsToAssign = roleDef.permissions.includes("*")
      ? ALL_PERMISSIONS
      : roleDef.permissions;

    for (const permName of permsToAssign) {
      const permission = await prisma.permission.findUnique({
        where: { name: permName },
      });

      if (permission) {
        await prisma.rolePermission.create({
          data: {
            roleId: role.id,
            permissionId: permission.id,
          },
        });
      }
    }
  }

  // 3. Seed Super Admin
  console.log("Seeding initial super admin...");
  const adminEmail = process.env.SUPER_ADMIN_EMAIL || "admin@utsjamshedpur.com";
  const adminPassword = process.env.SUPER_ADMIN_PASSWORD || "ChangeThisPassword123!";
  const adminName = process.env.SUPER_ADMIN_NAME || "Super Admin";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    // Note: Better Auth manages the hash through its adapter, but for direct
    // seeding via Prisma, we must hash it manually if inserting directly.
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        emailVerified: true,
        role: "super_admin",
        profile: {
          create: {
            status: "active",
            company: "Universal Techno Services",
          },
        },
      },
    });

    // Create the credentials account for Better Auth
    await prisma.account.create({
      data: {
        userId: newAdmin.id,
        accountId: adminEmail,
        providerId: "credential",
        password: hashedPassword,
      },
    });

    // Assign internal Role
    const superAdminRole = await prisma.role.findUnique({
      where: { name: "super_admin" },
    });

    if (superAdminRole) {
      await prisma.userRole.create({
        data: {
          userId: newAdmin.id,
          roleId: superAdminRole.id,
        },
      });
    }

    console.log(`✅ Super Admin created: ${adminEmail}`);
  } else {
    console.log(`ℹ️ Super Admin already exists: ${adminEmail}`);
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
