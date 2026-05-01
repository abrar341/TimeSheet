"use client"

import type { AxiosResponse } from "axios"
import { useQuery } from "@tanstack/react-query"

import { getRequest } from "@/utils/api/request-service"
import { TANSTACK_TIMESHEET } from "@/modules/common/constants/query-keys.tanstack.constants"
import { TIMESHEET_LIST_API_URL } from "@/modules/timesheets/constants/timesheet-api-url.constants"
import {
  toTimesheetEntryType,
  type timesheetEntryType,
} from "@/modules/timesheets/types/timesheet.type"
import type {
  timesheetFilterType,
  timesheetListMeta,
} from "@/modules/timesheets/types/timesheet-filter.type"
import { buildQueryString } from "@/utils/utils"

type ApiResponse = {
  data: unknown[]
  meta: timesheetListMeta
}

export const DEFAULT_META: timesheetListMeta = {
  total: 0,
  page: 1,
  pageSize: 5,
  totalPages: 1,
}

const fetchTimesheetList = async (
  filters?: timesheetFilterType | null
): Promise<{ rows: timesheetEntryType[]; meta: timesheetListMeta }> => {
  let url = TIMESHEET_LIST_API_URL

  if (filters) {
    const queryParams = buildQueryString(filters)
    if (queryParams) url = `${url}?${queryParams}`
  }

  const response: AxiosResponse<ApiResponse> = await getRequest<ApiResponse>(url)

  const rows = Array.isArray(response.data?.data)
    ? response.data.data.map((e) => toTimesheetEntryType(e))
    : []

  const meta: timesheetListMeta = response.data?.meta ?? DEFAULT_META

  return { rows, meta }
}

export function useTimesheetList(
  filters?: timesheetFilterType | null,
  staleTime: "Infinity" | 0 = 0
) {
  const { data, isLoading, isSuccess, isError, error, isFetching, refetch } = useQuery<
    { rows: timesheetEntryType[]; meta: timesheetListMeta },
    Error
  >({
    queryKey: [TANSTACK_TIMESHEET.list, filters],
    queryFn: () => fetchTimesheetList(filters),
    staleTime: staleTime === "Infinity" ? Infinity : 0,
  })

  return {
    data: data?.rows ?? [],
    meta: data?.meta ?? DEFAULT_META,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    refetch,
  }
}