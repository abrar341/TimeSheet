import * as yup from "yup"

import {
  emailSchema,
  passwordSchema,
} from "@/modules/common/schemas/validation.schema"

export const loginSchema = yup.object({
  email: emailSchema({ label: "Email", required: true }),
  password: passwordSchema({
    label: "Password",
    required: true,
    minLength: 6,
  }),
}).required()

