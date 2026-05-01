"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Info, Minus, Plus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { PROJECT_OPTIONS, WORK_TYPE_OPTIONS } from "@/modules/timesheets/constants/timesheet.constants"
import type { TimesheetTask, WorkType } from "@/modules/timesheets/types/timesheet-detail.type"

// ─── Schema ──────────────────────────────────────────────────────────────────
const schema = yup.object({
  project: yup.string().required("Project is required"),
  typeOfWork: yup
    .string()
    .oneOf(WORK_TYPE_OPTIONS as unknown as string[], "Select a valid work type")
    .required("Type of work is required"),
  description: yup.string().trim().required("Task description is required"),
  hours: yup
    .number()
    .typeError("Hours must be a number")
    .min(0.5, "Minimum 0.5 hrs")
    .max(24, "Maximum 24 hrs")
    .required("Hours are required"),
})

type FormValues = {
  project: string
  typeOfWork: string
  description: string
  hours: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="mb-1.5 flex items-center gap-1.5">
      <label className="text-sm font-medium text-zinc-800">
        {children}
        {required ? <span className="ml-0.5 text-zinc-800"> *</span> : null}
      </label>
      <Info className="size-3.5 text-zinc-400" />
    </div>
  )
}

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-xs text-red-500">{msg}</p> : null
}

function SelectField({
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: {
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  placeholder: string
  hasError?: boolean
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none rounded-lg border bg-white px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CE5]/30",
          hasError ? "border-red-400" : "border-zinc-200",
          !value ? "text-zinc-400" : "text-zinc-800"
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {/* chevron */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────
type AddTaskDialogProps = {
  open: boolean
  onOpenChange: (o: boolean) => void
  /** If provided, the dialog switches to edit mode */
  task?: TimesheetTask | null
  isPending?: boolean
  onSubmit: (values: Omit<TimesheetTask, "id">) => Promise<void>
}

// ─── Component ────────────────────────────────────────────────────────────────
export function AddTaskDialog({
  open,
  onOpenChange,
  task,
  isPending = false,
  onSubmit,
}: AddTaskDialogProps) {
  const isEdit = Boolean(task)

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      project: "",
      typeOfWork: "",
      description: "",
      hours: 1,
    },
  })

  // Populate when editing
  useEffect(() => {
    if (open) {
      if (task) {
        reset({
          project: task.project,
          typeOfWork: task.typeOfWork,
          description: task.description,
          hours: task.hours,
        })
      } else {
        reset({ project: "", typeOfWork: "", description: "", hours: 1 })
      }
    }
  }, [open, task, reset])

  const hoursValue = watch("hours") ?? 1

  const submitHandler = handleSubmit(async (values) => {
    await onSubmit({
      project: values.project,
      typeOfWork: values.typeOfWork as WorkType,
      description: values.description,
      hours: values.hours,
    })
    onOpenChange(false)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg rounded-2xl p-0"
        showClose
      >
        <DialogHeader className="border-b border-zinc-100 bg-white px-6 py-5">
          <DialogTitle className="text-lg font-semibold text-zinc-900">
            {isEdit ? "Edit Entry" : "Add New Entry"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="flex flex-col gap-5 px-6 py-6">
          {/* Select Project */}
          <div>
            <FieldLabel required>Select Project</FieldLabel>
            <Controller
              control={control}
              name="project"
              render={({ field }) => (
                <SelectField
                  value={field.value}
                  onChange={field.onChange}
                  options={PROJECT_OPTIONS}
                  placeholder="Project Name"
                  hasError={Boolean(errors.project)}
                />
              )}
            />
            <FieldError msg={errors.project?.message} />
          </div>

          {/* Type of Work */}
          <div>
            <FieldLabel required>Type of Work</FieldLabel>
            <Controller
              control={control}
              name="typeOfWork"
              render={({ field }) => (
                <SelectField
                  value={field.value}
                  onChange={field.onChange}
                  options={WORK_TYPE_OPTIONS}
                  placeholder="Select type"
                  hasError={Boolean(errors.typeOfWork)}
                />
              )}
            />
            <FieldError msg={errors.typeOfWork?.message} />
          </div>

          {/* Task description */}
          <div>
            <FieldLabel required>Task description</FieldLabel>
            <textarea
              {...register("description")}
              rows={5}
              placeholder="Write text here ..."
              className={cn(
                "w-full resize-none rounded-lg border px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1E5CE5]/30",
                errors.description ? "border-red-400" : "border-zinc-200"
              )}
            />
            <p className="mt-1 text-xs text-zinc-400">A note for extra info</p>
            <FieldError msg={errors.description?.message} />
          </div>

          {/* Hours stepper */}
          <div>
            <FieldLabel required>Hours</FieldLabel>
            <div className="flex items-center gap-0">
              <button
                type="button"
                onClick={() => setValue("hours", Math.max(0.5, hoursValue - 0.5))}
                className="flex size-10 items-center justify-center rounded-l-lg border border-r-0 border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 active:bg-zinc-100"
              >
                <Minus className="size-4" />
              </button>
              <input
                type="number"
                step={0.5}
                min={0.5}
                max={24}
                {...register("hours", { valueAsNumber: true })}
                className={cn(
                  "h-10 w-16 border border-zinc-200 bg-white text-center text-sm font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1E5CE5]/30",
                  errors.hours ? "border-red-400" : ""
                )}
              />
              <button
                type="button"
                onClick={() => setValue("hours", Math.min(24, hoursValue + 0.5))}
                className="flex size-10 items-center justify-center rounded-r-lg border border-l-0 border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 active:bg-zinc-100"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <FieldError msg={errors.hours?.message} />
          </div>

          {/* Footer buttons */}
          <div className="flex gap-3 border-t border-zinc-100 pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex h-11 flex-1 items-center justify-center rounded-lg bg-[#1E5CE5] text-sm font-semibold text-white transition-colors hover:bg-[#184BC0] disabled:opacity-60"
            >
              {isPending ? "Saving…" : isEdit ? "Save changes" : "Add entry"}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex h-11 flex-1 items-center justify-center rounded-lg border border-zinc-200 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
