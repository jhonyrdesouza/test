import type z from 'zod'
import type {
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
} from './validations'

export type LoginFormData = z.infer<typeof loginSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
