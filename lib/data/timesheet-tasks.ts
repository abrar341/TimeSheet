import type { TimesheetDay, TimesheetDetailType, TimesheetTask } from "@/modules/timesheets/types/timesheet-detail.type"

/** Mutable in-memory store keyed by timesheet id */
const detailStore: Record<string, TimesheetDetailType> = {
  "1": {
    id: "1",
    week: 1,
    dateRange: "1 - 5 January, 2024",
    totalHours: 20,
    targetHours: 40,
    days: [
      {
        label: "Jan 1",
        date: "2024-01-01",
        tasks: [
          { id: "t1", project: "Project Alpha", typeOfWork: "Feature development", description: "Homepage Development", hours: 4 },
          { id: "t2", project: "Project Alpha", typeOfWork: "Bug fixes", description: "API Integration", hours: 4 },
        ],
      },
      {
        label: "Jan 2",
        date: "2024-01-02",
        tasks: [
          { id: "t3", project: "Project Beta", typeOfWork: "Feature development", description: "Homepage Development", hours: 4 },
          { id: "t4", project: "Project Beta", typeOfWork: "Bug fixes", description: "Bug Fixes", hours: 4 },
        ],
      },
      {
        label: "Jan 3",
        date: "2024-01-03",
        tasks: [
          { id: "t5", project: "Project Alpha", typeOfWork: "Code review", description: "Code Review", hours: 2 },
          { id: "t6", project: "Project Alpha", typeOfWork: "Testing", description: "Unit Testing", hours: 2 },
        ],
      },
      { label: "Jan 4", date: "2024-01-04", tasks: [] },
      { label: "Jan 5", date: "2024-01-05", tasks: [] },
    ],
  },
  "2": {
    id: "2",
    week: 2,
    dateRange: "8 - 12 January, 2024",
    totalHours: 32,
    targetHours: 40,
    days: [
      {
        label: "Jan 8",
        date: "2024-01-08",
        tasks: [
          { id: "t10", project: "Project Alpha", typeOfWork: "Feature development", description: "Dashboard UI", hours: 4 },
          { id: "t11", project: "Project Alpha", typeOfWork: "Feature development", description: "State Management", hours: 4 },
        ],
      },
      {
        label: "Jan 9",
        date: "2024-01-09",
        tasks: [
          { id: "t12", project: "Project Beta", typeOfWork: "Feature development", description: "Dashboard UI", hours: 4 },
          { id: "t13", project: "Project Beta", typeOfWork: "Feature development", description: "API Endpoints", hours: 4 },
        ],
      },
      {
        label: "Jan 10",
        date: "2024-01-10",
        tasks: [
          { id: "t14", project: "Project Gamma", typeOfWork: "Feature development", description: "Dashboard UI", hours: 4 },
          { id: "t15", project: "Project Gamma", typeOfWork: "Feature development", description: "Dashboard UI", hours: 4 },
          { id: "t16", project: "Project Gamma", typeOfWork: "Bug fixes", description: "Refactoring", hours: 4 },
        ],
      },
      {
        label: "Jan 11",
        date: "2024-01-11",
        tasks: [
          { id: "t17", project: "Project Alpha", typeOfWork: "Feature development", description: "Dashboard UI", hours: 4 },
        ],
      },
      { label: "Jan 12", date: "2024-01-12", tasks: [] },
    ],
  },
  "3": {
    id: "3",
    week: 3,
    dateRange: "15 - 19 January, 2024",
    totalHours: 16,          // partial — not 40
    targetHours: 40,
    days: [
      {
        label: "Jan 15",
        date: "2024-01-15",
        tasks: [
          { id: "t7",  project: "Project Alpha", typeOfWork: "Feature development", description: "Dashboard UI",    hours: 4 },
          { id: "t8",  project: "Project Alpha", typeOfWork: "Bug fixes",           description: "Bug Fixes",       hours: 4 },
        ],
      },
      {
        label: "Jan 16",
        date: "2024-01-16",
        tasks: [
          { id: "t9",  project: "Project Beta",  typeOfWork: "Feature development", description: "API Integration", hours: 4 },
          { id: "t9b", project: "Project Beta",  typeOfWork: "Code review",         description: "Code Review",     hours: 4 },
        ],
      },
      { label: "Jan 17", date: "2024-01-17", tasks: [] },
      { label: "Jan 18", date: "2024-01-18", tasks: [] },
      { label: "Jan 19", date: "2024-01-19", tasks: [] },
    ],
  },
  "4": {
    id: "4",
    week: 4,
    dateRange: "22 - 26 January, 2024",
    totalHours: 40,
    targetHours: 40,
    days: [
      {
        label: "Jan 22",
        date: "2024-01-22",
        tasks: [
          { id: "t20", project: "Project Alpha", typeOfWork: "Feature development", description: "Homepage Development", hours: 4 },
          { id: "t21", project: "Project Alpha", typeOfWork: "Bug fixes", description: "Homepage Development", hours: 4 },
        ],
      },
      {
        label: "Jan 23",
        date: "2024-01-23",
        tasks: [
          { id: "t22", project: "Project Beta", typeOfWork: "Feature development", description: "Homepage Development", hours: 4 },
          { id: "t23", project: "Project Beta", typeOfWork: "Code review", description: "Homepage Development", hours: 4 },
          { id: "t24", project: "Project Beta", typeOfWork: "Testing", description: "Homepage Development", hours: 4 },
        ],
      },
      {
        label: "Jan 24",
        date: "2024-01-24",
        tasks: [
          { id: "t25", project: "Project Gamma", typeOfWork: "Feature development", description: "Homepage Development", hours: 4 },
          { id: "t26", project: "Project Gamma", typeOfWork: "Feature development", description: "Homepage Development", hours: 4 },
          { id: "t27", project: "Project Gamma", typeOfWork: "Documentation", description: "Homepage Development", hours: 4 },
        ],
      },
      {
        label: "Jan 25",
        date: "2024-01-25",
        tasks: [
          { id: "t28", project: "Project Alpha", typeOfWork: "Meeting", description: "Homepage Development", hours: 4 },
        ],
      },
      { label: "Jan 26", date: "2024-01-26", tasks: [] },
    ],
  },
  "5": {
    id: "5",
    week: 5,
    dateRange: "29 January - 2 February, 2024",
    totalHours: 0,
    targetHours: 40,
    days: [
      { label: "Jan 29", date: "2024-01-29", tasks: [] },
      { label: "Jan 30", date: "2024-01-30", tasks: [] },
      { label: "Jan 31", date: "2024-01-31", tasks: [] },
      { label: "Feb 1",  date: "2024-02-01", tasks: [] },
      { label: "Feb 2",  date: "2024-02-02", tasks: [] },
    ],
  },
  "6": {
    id: "6",
    week: 6,
    dateRange: "5 - 9 February, 2024",
    totalHours: 28,
    targetHours: 40,
    days: [
      {
        label: "Feb 5",
        date: "2024-02-05",
        tasks: [
          { id: "t30", project: "Project Alpha", typeOfWork: "Meeting", description: "Feature Planning", hours: 4 },
          { id: "t31", project: "Project Alpha", typeOfWork: "Design", description: "Design Review", hours: 4 },
        ],
      },
      {
        label: "Feb 6",
        date: "2024-02-06",
        tasks: [
          { id: "t32", project: "Project Beta", typeOfWork: "Feature development", description: "Frontend Build", hours: 4 },
          { id: "t33", project: "Project Beta", typeOfWork: "Feature development", description: "Frontend Build", hours: 4 },
        ],
      },
      {
        label: "Feb 7",
        date: "2024-02-07",
        tasks: [
          { id: "t34", project: "Project Alpha", typeOfWork: "Feature development", description: "Frontend Build", hours: 4 },
          { id: "t35", project: "Project Alpha", typeOfWork: "Testing", description: "Testing", hours: 4 },
          { id: "t36", project: "Project Alpha", typeOfWork: "Documentation", description: "Documentation", hours: 4 },
        ],
      },
      { label: "Feb 8", date: "2024-02-08", tasks: [] },
      { label: "Feb 9", date: "2024-02-09", tasks: [] },
    ],
  },
  "7": {
    id: "7",
    week: 7,
    dateRange: "12 - 16 February, 2024",
    totalHours: 12,
    targetHours: 40,
    days: [
      {
        label: "Feb 12",
        date: "2024-02-12",
        tasks: [
          { id: "t37", project: "Project Beta",  typeOfWork: "Feature development", description: "UI Components",  hours: 4 },
          { id: "t38", project: "Project Beta",  typeOfWork: "Testing",             description: "Unit Tests",     hours: 4 },
        ],
      },
      {
        label: "Feb 13",
        date: "2024-02-13",
        tasks: [
          { id: "t39", project: "Project Alpha", typeOfWork: "Bug fixes",           description: "Bug Fixes",      hours: 4 },
        ],
      },
      { label: "Feb 14", date: "2024-02-14", tasks: [] },
      { label: "Feb 15", date: "2024-02-15", tasks: [] },
      { label: "Feb 16", date: "2024-02-16", tasks: [] },
    ],
  },
  "8": {
    id: "8",
    week: 8,
    dateRange: "19 - 23 February, 2024",
    totalHours: 40,
    targetHours: 40,
    days: [
      {
        label: "Feb 19",
        date: "2024-02-19",
        tasks: [
          { id: "t40", project: "Project Gamma", typeOfWork: "Meeting", description: "Sprint Planning", hours: 4 },
          { id: "t41", project: "Project Gamma", typeOfWork: "Feature development", description: "Sprint Planning", hours: 4 },
        ],
      },
      {
        label: "Feb 20",
        date: "2024-02-20",
        tasks: [
          { id: "t42", project: "Project Gamma", typeOfWork: "Feature development", description: "Backend API", hours: 4 },
          { id: "t43", project: "Project Gamma", typeOfWork: "Feature development", description: "Backend API", hours: 4 },
        ],
      },
      {
        label: "Feb 21",
        date: "2024-02-21",
        tasks: [
          { id: "t44", project: "Project Alpha", typeOfWork: "Feature development", description: "Backend API", hours: 4 },
          { id: "t45", project: "Project Alpha", typeOfWork: "Feature development", description: "Backend API", hours: 4 },
          { id: "t46", project: "Project Alpha", typeOfWork: "Code review", description: "Code Review", hours: 4 },
        ],
      },
      {
        label: "Feb 22",
        date: "2024-02-22",
        tasks: [
          { id: "t47", project: "Project Alpha", typeOfWork: "Bug fixes", description: "Backend API", hours: 4 },
        ],
      },
      {
        label: "Feb 23",
        date: "2024-02-23",
        tasks: [
          { id: "t48", project: "Project Delta", typeOfWork: "Feature development", description: "Deployment", hours: 4 },
        ],
      },
    ],
  },
  "9": {
    id: "9",
    week: 9,
    dateRange: "26 Feb - 1 March, 2024",
    totalHours: 0,
    targetHours: 40,
    days: [
      { label: "Feb 26", date: "2024-02-26", tasks: [] },
      { label: "Feb 27", date: "2024-02-27", tasks: [] },
      { label: "Feb 28", date: "2024-02-28", tasks: [] },
      { label: "Feb 29", date: "2024-02-29", tasks: [] }, // 2024 is a leap year
      { label: "Mar 1",  date: "2024-03-01", tasks: [] },
    ],
  },
  "10": {
    id: "10",
    week: 10,
    dateRange: "4 - 8 March, 2024",
    totalHours: 36,
    targetHours: 40,
    days: [
      {
        label: "Mar 4",
        date: "2024-03-04",
        tasks: [
          { id: "t50", project: "Project Alpha", typeOfWork: "Meeting", description: "Q1 Review", hours: 4 },
          { id: "t51", project: "Project Alpha", typeOfWork: "Meeting", description: "Q1 Review", hours: 4 },
        ],
      },
      {
        label: "Mar 5",
        date: "2024-03-05",
        tasks: [
          { id: "t52", project: "Project Beta", typeOfWork: "Feature development", description: "Roadmap Planning", hours: 4 },
          { id: "t53", project: "Project Beta", typeOfWork: "Feature development", description: "Roadmap Planning", hours: 4 },
        ],
      },
      {
        label: "Mar 6",
        date: "2024-03-06",
        tasks: [
          { id: "t54", project: "Project Gamma", typeOfWork: "Feature development", description: "Roadmap Planning", hours: 4 },
          { id: "t55", project: "Project Gamma", typeOfWork: "Feature development", description: "Roadmap Planning", hours: 4 },
          { id: "t56", project: "Project Gamma", typeOfWork: "Meeting", description: "Stakeholder Meeting", hours: 4 },
        ],
      },
      {
        label: "Mar 7",
        date: "2024-03-07",
        tasks: [
          { id: "t57", project: "Project Alpha", typeOfWork: "Meeting", description: "Stakeholder Meeting", hours: 4 },
        ],
      },
      { label: "Mar 8", date: "2024-03-08", tasks: [] },
    ],
  },
  "11": {
    id: "11",
    week: 11,
    dateRange: "11 - 15 March, 2024",
    totalHours: 40,
    targetHours: 40,
    days: [
      {
        label: "Mar 11",
        date: "2024-03-11",
        tasks: [
          { id: "t60", project: "Project Alpha", typeOfWork: "Feature development", description: "Feature Development", hours: 4 },
          { id: "t61", project: "Project Alpha", typeOfWork: "Feature development", description: "Feature Development", hours: 4 },
        ],
      },
      {
        label: "Mar 12",
        date: "2024-03-12",
        tasks: [
          { id: "t62", project: "Project Beta", typeOfWork: "Feature development", description: "Feature Development", hours: 4 },
          { id: "t63", project: "Project Beta", typeOfWork: "Bug fixes", description: "Feature Development", hours: 4 },
        ],
      },
      {
        label: "Mar 13",
        date: "2024-03-13",
        tasks: [
          { id: "t64", project: "Project Gamma", typeOfWork: "Feature development", description: "Feature Development", hours: 4 },
          { id: "t65", project: "Project Gamma", typeOfWork: "Testing", description: "Feature Development", hours: 4 },
          { id: "t66", project: "Project Gamma", typeOfWork: "Code review", description: "Feature Development", hours: 4 },
        ],
      },
      {
        label: "Mar 14",
        date: "2024-03-14",
        tasks: [
          { id: "t67", project: "Project Alpha", typeOfWork: "Feature development", description: "Feature Development", hours: 4 },
          { id: "t68", project: "Project Alpha", typeOfWork: "Documentation", description: "Feature Development", hours: 4 },
          { id: "t69", project: "Project Alpha", typeOfWork: "Design", description: "Feature Development", hours: 4 },
        ],
      },
      {
        label: "Mar 15",
        date: "2024-03-15",
        tasks: [
          { id: "t70", project: "Project Alpha", typeOfWork: "Feature development", description: "Feature Development", hours: 4 },
        ],
      },
    ],
  },
  "12": {
    id: "12",
    week: 12,
    dateRange: "18 - 22 March, 2024",
    totalHours: 8,
    targetHours: 40,
    days: [
      {
        label: "Mar 18",
        date: "2024-03-18",
        tasks: [
          { id: "t71", project: "Project Alpha", typeOfWork: "Feature development", description: "Sprint Kickoff",  hours: 4 },
          { id: "t72", project: "Project Alpha", typeOfWork: "Meeting",             description: "Team Sync",       hours: 4 },
        ],
      },
      { label: "Mar 19", date: "2024-03-19", tasks: [] },
      { label: "Mar 20", date: "2024-03-20", tasks: [] },
      { label: "Mar 21", date: "2024-03-21", tasks: [] },
      { label: "Mar 22", date: "2024-03-22", tasks: [] },
    ],
  },
  "13": {
    id: "13",
    week: 13,
    dateRange: "25 - 29 March, 2024",
    totalHours: 0,
    targetHours: 40,
    days: [
      { label: "Mar 25", date: "2024-03-25", tasks: [] },
      { label: "Mar 26", date: "2024-03-26", tasks: [] },
      { label: "Mar 27", date: "2024-03-27", tasks: [] },
      { label: "Mar 28", date: "2024-03-28", tasks: [] },
      { label: "Mar 29", date: "2024-03-29", tasks: [] },
    ],
  },
}

export function getTimesheetDetail(id: string): TimesheetDetailType | null {
  return detailStore[id] ?? null
}

export function addTask(
  timesheetId: string,
  date: string,
  task: Omit<TimesheetTask, "id">
): TimesheetTask | null {
  const detail = detailStore[timesheetId]
  if (!detail) return null
  const day = detail.days.find((d) => d.date === date)
  if (!day) return null
  const newTask: TimesheetTask = { id: crypto.randomUUID(), ...task }
  day.tasks.push(newTask)
  detail.totalHours += task.hours
  return newTask
}

export function updateTask(
  timesheetId: string,
  taskId: string,
  patch: Partial<Omit<TimesheetTask, "id">>
): TimesheetTask | null {
  const detail = detailStore[timesheetId]
  if (!detail) return null
  for (const day of detail.days) {
    const idx = day.tasks.findIndex((t) => t.id === taskId)
    if (idx !== -1) {
      const oldHours = day.tasks[idx].hours
      day.tasks[idx] = { ...day.tasks[idx], ...patch }
      if (typeof patch.hours === "number") {
        detail.totalHours += patch.hours - oldHours
      }
      return day.tasks[idx]
    }
  }
  return null
}

export function deleteTask(timesheetId: string, taskId: string): boolean {
  const detail = detailStore[timesheetId]
  if (!detail) return false
  for (const day of detail.days) {
    const idx = day.tasks.findIndex((t) => t.id === taskId)
    if (idx !== -1) {
      detail.totalHours -= day.tasks[idx].hours
      day.tasks.splice(idx, 1)
      return true
    }
  }
  return false
}

export type { TimesheetTask, TimesheetDay }
