import { WORK_TYPE_OPTIONS, PROJECT_OPTIONS } from "@/modules/timesheets/constants/timesheet.constants"

export type WorkType = (typeof WORK_TYPE_OPTIONS)[number]
export type ProjectOption = (typeof PROJECT_OPTIONS)[number]

export type TimesheetTask = {
  id: string
  project: string
  typeOfWork: WorkType
  description: string
  hours: number
}

export type TimesheetDay = {
  label: string
  date: string
  tasks: TimesheetTask[]
}

export type TimesheetDetailType = {
  id: string
  week: number
  dateRange: string
  totalHours: number
  targetHours: number
  days: TimesheetDay[]
}
