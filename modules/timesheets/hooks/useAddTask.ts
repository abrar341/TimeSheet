"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { postRequest } from "@/utils/api/request-service"
import { TANSTACK_TIMESHEET } from "@/modules/common/constants/query-keys.tanstack.constants"
import { TIMESHEET_TASKS_API_URL } from "@/modules/timesheets/constants/timesheet-api-url.constants"
import type { TimesheetTask } from "@/modules/timesheets/types/timesheet-detail.type"

type AddTaskPayload = {
  date: string
} & Omit<TimesheetTask, "id">

export const useAddTask = (timesheetId: string) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: AddTaskPayload) =>
      postRequest(TIMESHEET_TASKS_API_URL(timesheetId), payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_TIMESHEET.detail, timesheetId],
      })
    },
  })

  return { mutateAsync, isPending }
}
