"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteRequest } from "@/utils/api/request-service"
import { TANSTACK_TIMESHEET } from "@/modules/common/constants/query-keys.tanstack.constants"
import { TIMESHEET_TASK_API_URL } from "@/modules/timesheets/constants/timesheet-api-url.constants"

export const useDeleteTask = (timesheetId: string) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (taskId: string) =>
      deleteRequest(TIMESHEET_TASK_API_URL(timesheetId, taskId)),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_TIMESHEET.detail, timesheetId],
      })
    },
  })

  return { mutateAsync, isPending }
}
