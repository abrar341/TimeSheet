import { updateTask, deleteTask } from "@/lib/data/timesheet-tasks"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; taskId: string }> }
) {
  const { id, taskId } = await params
  const body = await req.json().catch(() => null)
  if (!body) return Response.json({ message: "Invalid body" }, { status: 400 })
  const updated = updateTask(id, taskId, body)
  if (!updated) return Response.json({ message: "Not found" }, { status: 404 })
  return Response.json({ data: updated })
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; taskId: string }> }
) {
  const { id, taskId } = await params
  const ok = deleteTask(id, taskId)
  if (!ok) return Response.json({ message: "Not found" }, { status: 404 })
  return Response.json({ success: true })
}
