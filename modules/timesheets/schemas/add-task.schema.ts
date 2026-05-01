import * as yup from "yup"

import { WORK_TYPE_OPTIONS } from "@/modules/timesheets/constants/timesheet.constants"

export const addTaskSchema = yup.object({
  project: yup.string().required("Project is required"),
  typeOfWork: yup
    .string()
    .oneOf(WORK_TYPE_OPTIONS as unknown as string[], "Select a valid work type")
    .required("Type of work is required"),
  description: yup.string().trim().required("Task description is required"),
  hours: yup
    .number()
    .typeError("Hours must be a number")
    .min(0.5, "Minimum 0.5 hrs")
    .max(24, "Maximum 24 hrs")
    .required("Hours are required"),
})

export type AddTaskFormValues = {
  project: string
  typeOfWork: string
  description: string
  hours: number
}