export type TimesheetStatus = "COMPLETED" | "INCOMPLETE" | "MISSING"

export type timesheetEntryType = {
  id: string
  week: number
  dateRange: string
  status: TimesheetStatus
}

export const toTimesheetEntryType = (data: any): timesheetEntryType => {
  return {
    id: typeof data?.id === "string" ? data.id : crypto.randomUUID(),
    week: typeof data?.week === "number" ? data.week : 0,
    dateRange: typeof data?.dateRange === "string" ? data.dateRange : "",
    status:
      data?.status === "COMPLETED" || data?.status === "INCOMPLETE" || data?.status === "MISSING"
        ? data.status
        : "MISSING",
  }
}

