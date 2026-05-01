"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MoreHorizontal } from "lucide-react"

import { Card } from "@/components/app-cards/card/Card"
import { CardBody } from "@/components/app-cards/card/CardBody"
import { CopyrightFooterCard } from "@/components/app-cards/copyright-footer-card/CopyrightFooterCard"
import { Row } from "@/components/grid/Row"
import { Col } from "@/components/grid/Col"
import { cn } from "@/lib/utils"
import { TIMESHEETS_ROUTE } from "@/modules/timesheets/constants/timesheet-route.constants"
import { useTimesheetDetail } from "@/modules/timesheets/hooks/useTimesheetDetail"
import { useAddTask } from "@/modules/timesheets/hooks/useAddTask"
import { useUpdateTask } from "@/modules/timesheets/hooks/useUpdateTask"
import { useDeleteTask } from "@/modules/timesheets/hooks/useDeleteTask"
import { AddTaskDialog } from "@/modules/timesheets/components/AddTaskDialog"
import type { TimesheetTask, TimesheetDay } from "@/modules/timesheets/types/timesheet-detail.type"

// ─── Task row ─────────────────────────────────────────────────────────────────
function TaskRow({
  task,
  onEdit,
  onDelete,
}: {
  task: TimesheetTask
  onEdit: () => void
  onDelete: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Row gap={3} className="items-center rounded-lg border border-zinc-200 bg-white px-4 py-3">

      {/* Description — 10/12 on mobile (line 1 left), flex-1 on lg */}
      <Col xs={10} lg={6}
        className="order-1 lg:order-1 lg:flex-1 min-w-0 text-sm text-zinc-800 truncate"
      >
        {task.description}
      </Col>

      {/* Menu — 2/12 on mobile (line 1 right), last on lg */}
      <Col xs={2} lg={2}
        className="order-2 lg:order-4 flex justify-end"
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <MoreHorizontal className="size-4" />
          </button>

          {menuOpen ? (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-1 w-28 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-md">
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onEdit() }}
                  className="block w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onDelete() }}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </>
          ) : null}
        </div>
      </Col>

      {/* Hours — auto on mobile (line 2), second on lg */}
      <Col xs="auto" lg={2}
        className="order-3 lg:order-2 text-sm text-zinc-500 whitespace-nowrap"
      >
        {task.hours} hrs
      </Col>

      {/* Badge — auto on mobile (line 2), third on lg */}
      <Col xs="auto" lg={2}
        className="order-4 lg:order-3"
      >
        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100 whitespace-nowrap">
          {task.project}
        </span>
      </Col>

    </Row>
  )
}

// ─── Day group ────────────────────────────────────────────────────────────────
function DayGroup({
  day,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: {
  day: TimesheetDay
  onAddTask: (date: string) => void
  onEditTask: (task: TimesheetTask) => void
  onDeleteTask: (taskId: string) => void
}) {
  return (
    <Row gap={6}>
      <Col xs={12} sm={2} lg={1} className="pt-3 text-sm font-semibold text-zinc-700">
        {day.label}
      </Col>
      <Col xs={12} sm={10} lg={11} className="flex flex-col gap-2">
        {day.tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
        <button
          type="button"
          onClick={() => onAddTask(day.date)}
          className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-300 bg-white text-sm text-zinc-500 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
        >
          <span className="text-base leading-none">+</span>
          Add new task
        </button>
      </Col>
    </Row>
  )
}

// ─── Hours progress ───────────────────────────────────────────────────────────
function HoursProgress({ total, target }: { total: number; target: number }) {
  const pct = target > 0 ? Math.min(100, Math.round((total / target) * 100)) : 0
  const barColor = pct >= 100 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-400" : "bg-red-500"

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-semibold text-zinc-700">
          {total}/{target} hrs
        </span>
        <div className="h-2 w-32 overflow-hidden rounded-full bg-zinc-100">
          <div
            className={cn("h-full rounded-full transition-all", barColor)}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span className="text-sm font-medium text-zinc-500">{pct}%</span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TimesheetDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()

  const { data, isLoading, isError, error, refetch } = useTimesheetDetail(params.id)
  const { mutateAsync: addTask,    isPending: isAdding   } = useAddTask(params.id)
  const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTask(params.id)
  const { mutateAsync: deleteTask, isPending: isDeleting } = useDeleteTask(params.id)

  const isMutating = isAdding || isUpdating || isDeleting

  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeDate, setActiveDate] = useState<string | null>(null)
  const [editingTask, setEditingTask] = useState<TimesheetTask | null>(null)

  function openAdd(date: string) {
    setEditingTask(null)
    setActiveDate(date)
    setDialogOpen(true)
  }

  function openEdit(task: TimesheetTask) {
    setEditingTask(task)
    setActiveDate(null)
    setDialogOpen(true)
  }

  async function handleDelete(taskId: string) {
    if (!confirm("Delete this task?")) return
    await deleteTask(taskId)
  }

  async function handleSubmit(values: Omit<TimesheetTask, "id">) {
    if (editingTask) {
      await updateTask({ taskId: editingTask.id, ...values })
    } else if (activeDate) {
      await addTask({ date: activeDate, ...values })
    }
    setDialogOpen(false)
  }

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <Row gap={6}>
          <Col xs={12}>
            <Card>
              <CardBody isLoading={isLoading}>
                {isError ? (
                  <div className="flex flex-col items-center gap-3 py-12 text-center">
                    <p className="text-sm text-red-600">
                      {error?.message ?? "Failed to load timesheet"}
                    </p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold ring-1 ring-zinc-200 hover:bg-zinc-50"
                    >
                      Retry
                    </button>
                  </div>
                ) : data ? (
                  <div className="flex flex-col gap-6">
                    {/* Header: title + progress */}
                    <Row gap={4} className="border-b border-zinc-100 pb-5">
                      <Col xs={12} sm={7} lg={8} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => router.push(TIMESHEETS_ROUTE)}
                            className="inline-flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                          >
                            <ArrowLeft className="size-4" />
                          </button>
                          <h1 className="text-xl font-semibold text-zinc-900">
                            This week&apos;s timesheet
                          </h1>
                        </div>
                        <p className="pl-9 text-sm text-zinc-500">{data.dateRange}</p>
                      </Col>
                      <Col xs={12} sm={5} lg={4} className="flex items-center sm:justify-end">
                        <HoursProgress total={data.totalHours} target={data.targetHours} />
                      </Col>
                    </Row>

                    {/* Daily task groups */}
                    <div className="flex flex-col gap-5">
                      {data.days.map((day) => (
                        <DayGroup
                          key={day.date}
                          day={day}
                          onAddTask={openAdd}
                          onEditTask={openEdit}
                          onDeleteTask={handleDelete}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </Col>

          <CopyrightFooterCard />
        </Row>
      </main>

      <AddTaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        isPending={isMutating}
        onSubmit={handleSubmit}
      />
    </>
  )
}
