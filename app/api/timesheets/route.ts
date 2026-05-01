import { createTimesheet, listTimesheets } from "@/lib/data/timesheets"
import type { TimesheetStatus } from "@/modules/timesheets/types/timesheet.type"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const status = searchParams.get("status") as TimesheetStatus | null
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1)
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("pageSize") ?? "5", 10) || 5)
  )

  let rows = listTimesheets()

  // Filter by status
  if (status === "COMPLETED" || status === "INCOMPLETE" || status === "MISSING") {
    rows = rows.filter((r) => r.status === status)
  }

  const total = rows.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * pageSize
  const data = rows.slice(start, start + pageSize)

  return Response.json({
    data,
    meta: {
      total,
      page: safePage,
      pageSize,
      totalPages,
    },
  })
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as null | {
    week?: number
    dateRange?: string
    status?: TimesheetStatus
  }

  if (!body) return Response.json({ message: "Invalid JSON body" }, { status: 400 })

  if (
    typeof body.week !== "number" ||
    typeof body.dateRange !== "string" ||
    (body.status !== "COMPLETED" &&
      body.status !== "INCOMPLETE" &&
      body.status !== "MISSING")
  ) {
    return Response.json({ message: "Invalid payload" }, { status: 422 })
  }

  const created = createTimesheet({
    week: body.week,
    dateRange: body.dateRange,
    status: body.status,
  })

  return Response.json({ data: created }, { status: 201 })
}
