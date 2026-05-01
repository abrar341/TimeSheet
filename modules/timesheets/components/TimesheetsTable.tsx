"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/common/Button"
import { cn } from "@/lib/utils"
import type { timesheetEntryType as TimesheetEntryType } from "@/modules/timesheets/types/timesheet.type"
import {DataTable} from "@/components/datatable/Datatable";

// ─── Shared status badge ──────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TimesheetEntryType["status"] }) {
    const styles: Record<TimesheetEntryType["status"], string> = {
        COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        INCOMPLETE: "bg-amber-50 text-amber-700 ring-amber-200",
        MISSING:    "bg-rose-50 text-rose-700 ring-rose-200",
    }

    return (
        <span
            role="status"
            aria-label={`Status: ${status}`}
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset uppercase tracking-wide",
                styles[status]
            )}
        >
            {status}
        </span>
    )
}

function TimesheetMobileCard({
                                 row,
                                 onView,
                             }: {
    row: TimesheetEntryType
    onView: (id: string) => void
}) {
    const isCompleted = row.status === "COMPLETED"
    const label =
        row.status === "INCOMPLETE" ? "Update"
            : row.status === "MISSING"  ? "Create"
                :                             "View"

    return (
        <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-zinc-900">Week {row.week}</span>
                <span className="text-xs text-zinc-500">{row.dateRange}</span>
                <StatusBadge status={row.status} />
            </div>
            <Button
                variant="ghost"
                btnType="button"
                aria-label={`${label} timesheet for week ${row.week}`}
                onClick={() => (onView(row.id))}
                className="h-8 px-3 text-[#1E5CE5] hover:bg-blue-50 hover:text-[#184BC0]"
            >
                {label}
            </Button>
        </div>
    )
}

// ─── Column definitions ───────────────────────────────────────────────────────

function useTimesheetColumns(
    onView: (id: string) => void,
): ColumnDef<TimesheetEntryType>[] {
    return React.useMemo(
        () => [
            {
                header: "Week #",
                accessorKey: "week",
                cell: ({ row }) => (
                    <span className="font-medium text-zinc-900">{row.original.week}</span>
                ),
            },
            {
                header: "Date",
                accessorKey: "dateRange",
                cell: ({ row }) => (
                    <span className="text-zinc-700">{row.original.dateRange}</span>
                ),
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ row }) => <StatusBadge status={row.original.status} />,
            },
            {
                header: () => <span className="flex justify-end pr-2">Actions</span>,
                id: "actions",
                cell: ({ row }) => {
                    const { status, id, week } = row.original
                    const isCompleted = status === "COMPLETED"
                    const label =
                        status === "INCOMPLETE" ? "Update"
                            : status === "MISSING"   ? "Create"
                                :                          "View"

                    return (
                        <div className="flex justify-end">
                            <Button
                                variant="ghost"
                                btnType="button"
                                aria-label={`${label} timesheet for week ${week}`}
                                onClick={() => (onView(row.original.id))}
                                className="h-8 px-3 text-[#1E5CE5] hover:bg-blue-50 hover:text-[#184BC0]"
                            >
                                {label}
                            </Button>
                        </div>
                    )
                },
            },
        ],
        [onView]
    )
}

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
    data: TimesheetEntryType[]
    pageIndex: number
    pageSize: number
    totalPages: number
    onPageChange: (index: number) => void
    onPageSizeChange: (size: number) => void
    isLoading?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TimesheetsTable({
                                    data,
                                    pageIndex,
                                    pageSize,
                                    totalPages,
                                    onPageChange,
                                    onPageSizeChange,
                                    isLoading = false,
                                }: Props) {
    const router = useRouter()

    const handleView = React.useCallback(
        (id: string) => router.push(`/timesheets/${id}`),
        [router]
    )

    const columns = useTimesheetColumns(handleView)

    return (
        <DataTable
            data={data}
            columns={columns}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            isLoading={isLoading}
            emptyMessage="No timesheets found."
            paginationLabel="Timesheets pagination"
            // Custom mobile card — remove this prop to use the auto-generated one
            renderMobileCard={(row) => (
                <TimesheetMobileCard
                    key={row.id}
                    row={row.original}
                    onView={handleView}
                />
            )}
        />
    )
}