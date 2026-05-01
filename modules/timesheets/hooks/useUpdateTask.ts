"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { patchRequest } from "@/utils/api/request-service"
import { TANSTACK_TIMESHEET } from "@/modules/common/constants/query-keys.tanstack.constants"
import { TIMESHEET_TASK_API_URL } from "@/modules/timesheets/constants/timesheet-api-url.constants"
import type { TimesheetTask } from "@/modules/timesheets/types/timesheet-detail.type"

type UpdateTaskPayload = {
  taskId: string
} & Omit<TimesheetTask, "id">

export const useUpdateTask = (timesheetId: string) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ taskId, ...data }: UpdateTaskPayload) =>
      patchRequest(TIMESHEET_TASK_API_URL(timesheetId, taskId), data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_TIMESHEET.detail, timesheetId],
      })
    },
  })

  return { mutateAsync, isPending }
}
