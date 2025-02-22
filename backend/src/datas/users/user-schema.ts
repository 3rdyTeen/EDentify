import { z } from 'zod';

/** ----------------  User Schema  ----------------   */

const UserStatusType = {
  Active: 'Active',
  Deactivated: 'Deactivated',
} as const;

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  status: z.nativeEnum(UserStatusType).optional().default(UserStatusType.Active),
  confirmation_code: z.string().optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

/** ----------------  User Types  ----------------   */

export type UserStatusType = (typeof UserStatusType)[keyof typeof UserStatusType];
export type TUserSchema = z.infer<typeof userSchema>;
export type TUserLoginSchema = z.infer<typeof userLoginSchema>;
