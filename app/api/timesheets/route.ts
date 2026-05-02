import { listTimesheets, createTimesheet } from "@/lib/data/timesheets"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10")

  const all = listTimesheets()
  const total = all.length
  const totalPages = Math.ceil(total / pageSize)
  const data = all.slice((page - 1) * pageSize, page * pageSize)

  return Response.json({
    data,
    meta: {
      page,
      pageSize,
      total,
      totalPages,
    },
  })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return Response.json({ message: "Invalid JSON body" }, { status: 400 })

  const created = createTimesheet({
    week: body.week,
    dateRange: body.dateRange,
  })
  return Response.json({ data: created }, { status: 201 })
}