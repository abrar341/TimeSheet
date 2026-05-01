"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Minus, Plus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SelectControl } from "@/components/common/SelectControl"
import { TextareaControl } from "@/components/common/TextareaControl"
import { InputControl } from "@/components/common/InputControl"
import { Button } from "@/components/common/Button"
import { PROJECT_OPTIONS, WORK_TYPE_OPTIONS } from "@/modules/timesheets/constants/timesheet.constants"
import type { TimesheetTask, WorkType } from "@/modules/timesheets/types/timesheet-detail.type"
import { addTaskSchema, type AddTaskFormValues } from "@/modules/timesheets/schemas/add-task.schema"

// ─── Schema ───────────────────────────────────────────────────────────────────
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

// ─── Stepper buttons (passed as prefix / postfix to InputControl) ─────────────
function StepBtn({
  icon,
  onClick,
}: {
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded text-zinc-600 hover:bg-zinc-100 active:bg-zinc-200"
    >
      {icon}
    </button>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────
type AddTaskDialogProps = {
  open: boolean
  onOpenChange: (o: boolean) => void
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
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddTaskFormValues>({
    resolver: yupResolver(addTaskSchema) as any,
    defaultValues: { project: "", typeOfWork: "", description: "", hours: 1 },
  })

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

  const submitHandler = handleSubmit(async (values: AddTaskFormValues) => {
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
      <DialogContent className="max-w-lg rounded-lg p-0" showClose>
        <DialogHeader className="border-b border-zinc-100 bg-white px-6 py-5">
          <DialogTitle className="text-lg font-semibold text-zinc-900">
            {isEdit ? "Edit Entry" : "Add New Entry"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="flex flex-col gap-5 px-6 py-6">

          {/* Select Project */}
          <SelectControl
            control={control}
            name="project"
            label="Select Project"
            required
            placeholder="Project Name"
            options={PROJECT_OPTIONS}
          />

          {/* Type of Work */}
          <SelectControl
            control={control}
            name="typeOfWork"
            label="Type of Work"
            required
            placeholder="Select type"
            options={WORK_TYPE_OPTIONS}
          />

          {/* Task description */}
          <TextareaControl
            control={control}
            name="description"
            label="Task description"
            required
            rows={5}
            placeholder="Write text here ..."
            hint="A note for extra info"
          />

          {/* Hours stepper — InputControl with prefix/postfix buttons */}
          <InputControl
            control={control}
            name="hours"
            label="Hours"
            required
            type="number"
            placeholder="0"
            prefixButton={
              <StepBtn
                icon={<Minus className="size-4" />}
                onClick={() => setValue("hours", Math.max(0.5, hoursValue - 0.5))}
              />
            }
            postfixButton={
              <StepBtn
                icon={<Plus className="size-4" />}
                onClick={() => setValue("hours", Math.min(24, hoursValue + 0.5))}
              />
            }
            className="w-36"
          />

          {/* Footer buttons */}
          <div className="flex gap-3 border-t border-zinc-100 pt-4">
            <Button
              btnType="submit"
              variant="primary"
              isLoading={isPending}
              className="h-11 flex-1"
            >
              {isEdit ? "Save changes" : "Add entry"}
            </Button>
            <Button
              btnType="button"
              variant="outline-light"
              onClick={() => onOpenChange(false)}
              className="h-11 flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}