import { getTimesheetDetail, addTask, updateTask, deleteTask } from "@/lib/data/timesheet-tasks"
import { updateTimesheet } from "@/lib/data/timesheets"
import type { TimesheetStatus } from "@/modules/timesheets/types/timesheet.type"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const detail = getTimesheetDetail(id)
  if (!detail) return Response.json({ message: "Not found" }, { status: 404 })
  return Response.json({ data: detail })
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const body = (await req.json().catch(() => null)) as null | {
    week?: number
    dateRange?: string
    status?: TimesheetStatus
  }

  if (!body) return Response.json({ message: "Invalid JSON body" }, { status: 400 })

  const patch: { week?: number; dateRange?: string; status?: TimesheetStatus } = {}
  if (typeof body.week === "number") patch.week = body.week
  if (typeof body.dateRange === "string") patch.dateRange = body.dateRange
  if (body.status === "COMPLETED" || body.status === "INCOMPLETE" || body.status === "MISSING") {
    patch.status = body.status
  }

  const updated = updateTimesheet(id, patch)
  if (!updated) return Response.json({ message: "Not found" }, { status: 404 })

  return Response.json({ data: updated })
}

