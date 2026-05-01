import * as yup from "yup"

import { nameSchema } from "@/modules/common/schemas/validation.schema"

export const timesheetEntrySchema = yup
  .object({
    project: nameSchema({ label: "Project", required: true, minLength: 2 }),
    workType: nameSchema({ label: "Type of Work", required: true, minLength: 2 }),
    description: yup
      .string()
      .trim()
      .required("Task description is required")
      .min(3, "Task description must be at least 3 characters")
      .max(500, "Task description must be at most 500 characters"),
    hours: yup
      .number()
      .typeError("Hours is required")
      .required("Hours is required")
      .min(0, "Hours cannot be negative")
      .max(24, "Hours cannot be more than 24"),
  })
  .required()

