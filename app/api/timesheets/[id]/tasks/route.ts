import { addTask } from "@/lib/data/timesheet-tasks"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json().catch(() => null)
  if (!body || typeof body.date !== "string" || typeof body.description !== "string") {
    return Response.json({ message: "Invalid body" }, { status: 400 })
  }
  const task = addTask(id, body.date, {
    description: body.description,
    hours: typeof body.hours === "number" ? body.hours : 0,
    project: typeof body.project === "string" ? body.project : "",
    typeOfWork: typeof body.typeOfWork === "string" ? body.typeOfWork : "Feature development",
  })
  if (!task) return Response.json({ message: "Timesheet or day not found" }, { status: 404 })
  return Response.json({ data: task }, { status: 201 })
}
