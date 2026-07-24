"use server";

import { verifySession } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { profileUpdateSchema, type ProfileUpdateInput } from "@/schemas/auth";
import { createAuditLog } from "@/server/auth/audit";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(data: ProfileUpdateInput) {
  try {
    const { user } = await verifySession();
    
    // Validate input
    const validatedData = profileUpdateSchema.safeParse(data);
    if (!validatedData.success) {
      return { 
        success: false, 
        error: "Invalid profile data",
        errors: validatedData.error.flatten().fieldErrors 
      };
    }

    const { name, ...profileData } = validatedData.data;

    // Run in transaction to update both User and Profile tables
    await prisma.$transaction(async (tx) => {
      // 1. Update core User table if name changed
      if (name && name !== user.name) {
        await tx.user.update({
          where: { id: user.id },
          data: { name },
        });
      }

      // 2. Upsert extended Profile table
      if (Object.keys(profileData).length > 0) {
        await tx.profile.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            ...profileData,
          },
          update: profileData,
        });
      }

      // 3. Log audit event
      await createAuditLog({
        userId: user.id,
        action: "profile_update",
        resource: "profile",
        resourceId: user.id,
        details: { fieldsUpdated: Object.keys(validatedData.data) }
      });
    });

    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully" };

  } catch (error) {
    console.error("[PROFILE_UPDATE_ERROR]", error);
    return { success: false, error: "An unexpected error occurred while updating your profile." };
  }
}
