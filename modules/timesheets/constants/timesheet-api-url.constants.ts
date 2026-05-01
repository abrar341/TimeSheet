export const TIMESHEET_LIST_API_URL = "/timesheets"
export const TIMESHEET_DETAIL_API_URL = (id: string) => `/timesheets/${id}`
export const TIMESHEET_TASKS_API_URL = (timesheetId: string) => `/timesheets/${timesheetId}/tasks`
export const TIMESHEET_TASK_API_URL = (timesheetId: string, taskId: string) =>
  `/timesheets/${timesheetId}/tasks/${taskId}`
