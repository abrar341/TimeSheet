import { getTimesheetDetail } from "@/lib/data/timesheet-tasks"
import type { timesheetEntryType, TimesheetStatus } from "@/modules/timesheets/types/timesheet.type"

function deriveStatus(id: string): TimesheetStatus {
  const detail = getTimesheetDetail(id)
  if (!detail || detail.totalHours === 0) return "MISSING"
  if (detail.totalHours >= detail.targetHours) return "COMPLETED"
  return "INCOMPLETE"
}

function makeWeeks(): Omit<timesheetEntryType, "status">[] {
  return [
    { id: "1",  week: 1,  dateRange: "1 - 5 January, 2024" },
    { id: "2",  week: 2,  dateRange: "8 - 12 January, 2024" },
    { id: "3",  week: 3,  dateRange: "15 - 19 January, 2024" },
    { id: "4",  week: 4,  dateRange: "22 - 26 January, 2024" },
    { id: "5",  week: 5,  dateRange: "29 January - 2 February, 2024" },
    { id: "6",  week: 6,  dateRange: "5 - 9 February, 2024" },
    { id: "7",  week: 7,  dateRange: "12 - 16 February, 2024" },
    { id: "8",  week: 8,  dateRange: "19 - 23 February, 2024" },
    { id: "9",  week: 9,  dateRange: "26 Feb - 1 March, 2024" },
    { id: "10", week: 10, dateRange: "4 - 8 March, 2024" },
    { id: "11", week: 11, dateRange: "11 - 15 March, 2024" },
    { id: "12", week: 12, dateRange: "18 - 22 March, 2024" },
    { id: "13", week: 13, dateRange: "25 - 29 March, 2024" },
  ]
}

let store: Omit<timesheetEntryType, "status">[] = makeWeeks()

export function listTimesheets(): timesheetEntryType[] {
  return store.map(entry => ({
    ...entry,
    status: deriveStatus(entry.id),
  }))
}

export function createTimesheet(entry: Omit<timesheetEntryType, "id" | "status">) {
  const created: Omit<timesheetEntryType, "status"> = { id: crypto.randomUUID(), ...entry }
  store = [created, ...store]
  return { ...created, status: deriveStatus(created.id) }
}

export function updateTimesheet(
  id: string,
  patch: Partial<Omit<timesheetEntryType, "id" | "status">>
) {
  const idx = store.findIndex((t) => t.id === id)
  if (idx === -1) return null
  store[idx] = { ...store[idx], ...patch }
  return { ...store[idx], status: deriveStatus(id) }
}