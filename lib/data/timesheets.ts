import type { timesheetEntryType } from "@/modules/timesheets/types/timesheet.type"

const statuses: timesheetEntryType["status"][] = ["COMPLETED", "COMPLETED", "INCOMPLETE", "COMPLETED", "MISSING"]

function makeWeeks(): timesheetEntryType[] {
  const rows: timesheetEntryType[] = [
    // January 2024
    { id: "1",  week: 1,  dateRange: "1 - 5 January, 2024",    status: "COMPLETED" },
    { id: "2",  week: 2,  dateRange: "8 - 12 January, 2024",   status: "COMPLETED" },
    { id: "3",  week: 3,  dateRange: "15 - 19 January, 2024",  status: "INCOMPLETE" },
    { id: "4",  week: 4,  dateRange: "22 - 26 January, 2024",  status: "COMPLETED" },
    { id: "5",  week: 5,  dateRange: "29 January - 2 February, 2024", status: "MISSING" },
    // February 2024
    { id: "6",  week: 6,  dateRange: "5 - 9 February, 2024",   status: "COMPLETED" },
    { id: "7",  week: 7,  dateRange: "12 - 16 February, 2024", status: "INCOMPLETE" },
    { id: "8",  week: 8,  dateRange: "19 - 23 February, 2024", status: "COMPLETED" },
    { id: "9",  week: 9,  dateRange: "26 Feb - 1 March, 2024", status: "MISSING" },
    // March 2024
    { id: "10", week: 10, dateRange: "4 - 8 March, 2024",      status: "COMPLETED" },
    { id: "11", week: 11, dateRange: "11 - 15 March, 2024",    status: "COMPLETED" },
    { id: "12", week: 12, dateRange: "18 - 22 March, 2024",    status: "INCOMPLETE" },
    { id: "13", week: 13, dateRange: "25 - 29 March, 2024",    status: "MISSING" },
  ]
  return rows
}

// In-memory dummy store (resets on server restart).
let store: timesheetEntryType[] = makeWeeks()

export function listTimesheets() {
  return store
}

export function createTimesheet(entry: Omit<timesheetEntryType, "id">) {
  const created: timesheetEntryType = { id: crypto.randomUUID(), ...entry }
  store = [created, ...store]
  return created
}

export function updateTimesheet(
  id: string,
  patch: Partial<Omit<timesheetEntryType, "id">>
) {
  const idx = store.findIndex((t) => t.id === id)
  if (idx === -1) return null
  store[idx] = { ...store[idx], ...patch }
  return store[idx]
}
