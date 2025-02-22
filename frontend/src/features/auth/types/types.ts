import * as z from 'zod'

// Signin
export const SigninSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export type SigninSchemaType = z.infer<typeof SigninSchema>;

//Signup
// Define form validation schema
export const SignupSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type SignupSchemaType = z.infer<typeof SignupSchema>;


// Forgot Password
export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  })
})

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;


// Reset Password
export const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
