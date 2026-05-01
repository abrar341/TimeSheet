"use client"

import type { AxiosResponse } from "axios"
import { useQuery } from "@tanstack/react-query"

import { getRequest } from "@/utils/api/request-service"
import { TANSTACK_TIMESHEET } from "@/modules/common/constants/query-keys.tanstack.constants"
import { TIMESHEET_DETAIL_API_URL } from "@/modules/timesheets/constants/timesheet-api-url.constants"
import type { TimesheetDetailType } from "@/modules/timesheets/types/timesheet-detail.type"

const fetchDetail = async (id: string): Promise<TimesheetDetailType> => {
  const response: AxiosResponse<{ data: TimesheetDetailType }> =
    await getRequest<{ data: TimesheetDetailType }>(TIMESHEET_DETAIL_API_URL(id))
  return response.data.data
}

export const useTimesheetDetail = (id: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery<TimesheetDetailType, Error>({
    queryKey: [TANSTACK_TIMESHEET.detail, id],
    queryFn: () => fetchDetail(id),
    enabled: Boolean(id),
  })

  return { data: data ?? null, isLoading, isError, error, refetch }
}
