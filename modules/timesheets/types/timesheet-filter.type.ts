import type { TimesheetStatus } from "@/modules/timesheets/types/timesheet.type"

export type timesheetFilterType = {
  status?: TimesheetStatus
  page?: number
  pageSize?: number
}

export type timesheetListMeta = {
  total: number
  page: number
  pageSize: number
  totalPages: number
}
