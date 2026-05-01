"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    type Row,
} from "@tanstack/react-table"
import { Select } from "@/components/common/Select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// ─── Page size options ────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50].map((s) => ({
    label: `${s} per page`,
    value: String(s),
}))

// ─── Pagination helpers ───────────────────────────────────────────────────────

function buildPageNumbers(pageIndex: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i)

    const pages: (number | "…")[] = [0]
    const windowStart = Math.max(1, pageIndex - 1)
    const windowEnd = Math.min(total - 2, pageIndex + 1)

    if (windowStart > 1) pages.push("…")
    for (let i = windowStart; i <= windowEnd; i++) pages.push(i)
    if (windowEnd < total - 2) pages.push("…")
    pages.push(total - 1)

    return pages
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function PageButton({
                        active,
                        disabled,
                        onClick,
                        children,
                        ariaLabel,
                    }: {
    active?: boolean
    disabled?: boolean
    onClick: () => void
    children: React.ReactNode
    ariaLabel: string
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-current={active ? "page" : undefined}
            className={cn(
                "inline-flex h-8 min-w-[32px] items-center justify-center rounded-md border px-1.5 text-sm transition-colors",
                active
                    ? "border-[#1E5CE5] font-medium text-[#1E5CE5]"
                    : "border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-800",
                disabled && "cursor-not-allowed opacity-40"
            )}
        >
            {children}
        </button>
    )
}

function SkeletonCard() {
    return (
        <div className="space-y-2 rounded-lg border border-zinc-100 bg-white p-4">
            <div className="h-3.5 w-1/3 animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-100" />
            <div className="flex justify-end pt-1">
                <div className="h-7 w-16 animate-pulse rounded bg-zinc-100" />
            </div>
        </div>
    )
}

function SkeletonRow({ cols }: { cols: number }) {
    return (
        <TableRow className="border-b border-zinc-100">
            {Array.from({ length: cols }).map((_, i) => (
                <TableCell key={i}>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-100" />
                </TableCell>
            ))}
        </TableRow>
    )
}

// ─── Default mobile card ──────────────────────────────────────────────────────
// Automatically derived from column definitions — no extra config needed.

function DefaultMobileCard<TData>({ row }: { row: Row<TData> }) {
    const cells = row.getVisibleCells()
    const dataCells = cells.slice(0, -1)   // all except last (actions)
    const actionCell = cells[cells.length - 1]

    return (
        <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                {dataCells.map((cell) => {
                    const headerDef = cell.column.columnDef.header
                    const headerLabel =
                        typeof headerDef === "string" ? headerDef : cell.column.id

                    return (
                        <React.Fragment key={cell.id}>
                            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                {headerLabel}
                            </dt>
                            <dd className="text-sm text-zinc-700">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </dd>
                        </React.Fragment>
                    )
                })}
            </dl>

            {actionCell && (
                <div className="flex justify-end border-t border-zinc-100 pt-2">
                    {flexRender(actionCell.column.columnDef.cell, actionCell.getContext())}
                </div>
            )}
        </div>
    )
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
                        pageIndex,
                        pageSize,
                        totalPages,
                        onPageChange,
                        onPageSizeChange,
                        isLoading,
                        paginationLabel,
                    }: {
    pageIndex: number
    pageSize: number
    totalPages: number
    onPageChange: (i: number) => void
    onPageSizeChange: (s: number) => void
    isLoading: boolean
    paginationLabel: string
}) {
    const pageNumbers = React.useMemo(
        () => buildPageNumbers(pageIndex, totalPages),
        [pageIndex, totalPages]
    )

    return (
        <nav
            aria-label={paginationLabel}
            className="flex flex-col items-center justify-between gap-3 border-t border-zinc-100 px-2 py-3 sm:flex-row"
        >
            <Select
                value={String(pageSize)}
                onChange={(v) => {
                    onPageSizeChange(Number(v))
                    onPageChange(0)
                }}
                options={PAGE_SIZE_OPTIONS}
                size="sm"
            />

            {totalPages > 1 && (
                <>
                    {/* Desktop pagination — full page number list */}
                    <div className="hidden items-center gap-1 sm:flex">
                        <PageButton
                            ariaLabel="Go to previous page"
                            onClick={() => onPageChange(pageIndex - 1)}
                            disabled={pageIndex === 0 || isLoading}
                        >
                            Previous
                        </PageButton>

                        {pageNumbers.map((p, idx) =>
                            p === "…" ? (
                                <span
                                    key={`ellipsis-${idx}`}
                                    aria-hidden="true"
                                    className="px-1 text-sm text-zinc-400"
                                >
                                    ···
                                </span>
                            ) : (
                                <PageButton
                                    key={p}
                                    active={p === pageIndex}
                                    ariaLabel={`Go to page ${(p as number) + 1}`}
                                    onClick={() => onPageChange(p as number)}
                                    disabled={isLoading}
                                >
                                    {(p as number) + 1}
                                </PageButton>
                            )
                        )}

                        <PageButton
                            ariaLabel="Go to next page"
                            onClick={() => onPageChange(pageIndex + 1)}
                            disabled={pageIndex >= totalPages - 1 || isLoading}
                        >
                            Next
                        </PageButton>
                    </div>

                    {/* Mobile pagination — simple prev / "Page X of Y" / next */}
                    <div className="flex w-full items-center justify-between sm:hidden">
                        <PageButton
                            ariaLabel="Go to previous page"
                            onClick={() => onPageChange(pageIndex - 1)}
                            disabled={pageIndex === 0 || isLoading}
                        >
                            ← Prev
                        </PageButton>

                        <span className="text-sm text-zinc-500">
                            Page {pageIndex + 1} of {totalPages}
                        </span>

                        <PageButton
                            ariaLabel="Go to next page"
                            onClick={() => onPageChange(pageIndex + 1)}
                            disabled={pageIndex >= totalPages - 1 || isLoading}
                        >
                            Next →
                        </PageButton>
                    </div>
                </>
            )}
        </nav>
    )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export type DataTableProps<TData> = {
    /** Row data */
    data: TData[]
    /** TanStack column definitions — all rendering logic lives here */
    columns: ColumnDef<TData>[]
    /** Current zero-based page index */
    pageIndex: number
    /** Rows per page */
    pageSize: number
    /** Total number of pages */
    totalPages: number
    /** Called when the user navigates to a page */
    onPageChange: (index: number) => void
    /** Called when the user changes page size */
    onPageSizeChange: (size: number) => void
    /** Show loading skeletons */
    isLoading?: boolean
    /** Empty-state message */
    emptyMessage?: string
    /** aria-label for the pagination nav */
    paginationLabel?: string
    /**
     * Optional custom mobile card renderer.
     * If omitted, a generic key→value card is auto-generated from your columns.
     * Use this when you want a richer, domain-specific mobile layout.
     *
     * @example
     * renderMobileCard={(row) => (
     *   <TimesheetMobileCard key={row.id} row={row.original} onAction={onAction} />
     * )}
     */
    renderMobileCard?: (row: Row<TData>) => React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<TData>({
                                     data,
                                     columns,
                                     pageIndex,
                                     pageSize,
                                     totalPages,
                                     onPageChange,
                                     onPageSizeChange,
                                     isLoading = false,
                                     emptyMessage = "No records found.",
                                     paginationLabel = "Pagination",
                                     renderMobileCard,
                                 }: DataTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: totalPages,
        state: { pagination: { pageIndex, pageSize } },
        onPaginationChange: () => {},
    })

    const rows = table.getRowModel().rows

    return (
        <div className="flex flex-col">

            {/* ── Mobile: card list ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-3 sm:hidden" aria-busy={isLoading} aria-live="polite">
                {isLoading ? (
                    Array.from({ length: Math.min(pageSize, 5) }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                ) : rows.length ? (
                    rows.map((row) =>
                        renderMobileCard ? (
                            <React.Fragment key={row.id}>
                                {renderMobileCard(row)}
                            </React.Fragment>
                        ) : (
                            <DefaultMobileCard key={row.id} row={row} />
                        )
                    )
                ) : (
                    <div className="py-12 text-center text-sm text-zinc-500">
                        {emptyMessage}
                    </div>
                )}
            </div>

            {/* ── Desktop: full table ───────────────────────────────────────── */}
            <div className="relative hidden sm:block">
                {isLoading && (
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 z-10 rounded-md bg-white/60 backdrop-blur-[1px]"
                    />
                )}

                <Table>
                    <TableHeader className="bg-zinc-50">
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-xs font-semibold uppercase tracking-wide text-zinc-500"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody aria-busy={isLoading} aria-live="polite">
                        {isLoading ? (
                            Array.from({ length: pageSize }).map((_, i) => (
                                <SkeletonRow key={i} cols={columns.length} />
                            ))
                        ) : rows.length ? (
                            rows.map((row) => (
                                <TableRow key={row.id} className="border-b border-zinc-100">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-zinc-500"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ── Pagination (shared, responsive internally) ────────────────── */}
            <Pagination
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                isLoading={isLoading}
                paginationLabel={paginationLabel}
            />
        </div>
    )
}