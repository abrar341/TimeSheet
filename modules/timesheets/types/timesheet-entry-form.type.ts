export type timesheetEntryFormType = {
  project: string
  workType: string
  description: string
  hours: number
}

export const toTimesheetEntryFormType = (data: any): timesheetEntryFormType => {
  return {
    project: typeof data?.project === "string" ? data.project.trim() : "",
    workType: typeof data?.workType === "string" ? data.workType.trim() : "",
    description: typeof data?.description === "string" ? data.description.trim() : "",
    hours: typeof data?.hours === "number" ? data.hours : Number(data?.hours ?? 0),
  }
}

