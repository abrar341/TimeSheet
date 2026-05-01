"use client";

import { useState } from "react";

import { Card } from "@/components/app-cards/card/Card";
import { CardBody } from "@/components/app-cards/card/CardBody";
import { CardHeader } from "@/components/app-cards/card/CardHeader";
import { CopyrightFooterCard } from "@/components/app-cards/copyright-footer-card/CopyrightFooterCard";
import { Row } from "@/components/grid/Row";
import { Col } from "@/components/grid/Col";
import { TimesheetsTable } from "@/modules/timesheets/components/TimesheetsTable";
import type { TimesheetStatus } from "@/modules/timesheets/types/timesheet.type";
import { useTimesheetList } from "@/modules/timesheets/hooks/useTimesheetList";
import { SelectControl } from "@/components/common/SelectControl";

const STATUS_OPTIONS: { label: string; value: TimesheetStatus | "" }[] = [
  { label: "All statuses", value: "" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Incomplete", value: "INCOMPLETE" },
  { label: "Missing", value: "MISSING" },
];

export default function TimesheetsPage() {
  const [statusFilter, setStatusFilter] = useState<TimesheetStatus | "">("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const filters = {
    ...(statusFilter ? { status: statusFilter as TimesheetStatus } : {}),
    page: pageIndex + 1,
    pageSize,
  };

  const {
    data: timesheets,
    meta,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useTimesheetList(filters);

  function handleStatusChange(value: string) {
  setStatusFilter(value as TimesheetStatus | "")
  setPageIndex(0)
}

  function handlePageChange(index: number) {
    setPageIndex(index);
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    setPageIndex(0);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      <Row gap={6}>
        <Col xs={12}>
          <Card>
            <CardHeader
              title="Your Timesheets"
              className="flex-col items-start gap-3"
            >
              <div className="flex items-center gap-2">
                <SelectControl
                  value={statusFilter}
                  onChange={handleStatusChange}
                  options={STATUS_OPTIONS}
                  placeholder="Status"
                />
              </div>
            </CardHeader>

            <CardBody isLoading={isLoading}>
              {isError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <p className="font-medium">
                    {error?.message ?? "Failed to load timesheets"}
                  </p>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="mt-2 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-red-800 ring-1 ring-red-200 hover:bg-red-50"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <>
                  {!isLoading && isFetching ? (
                    <p className="mb-2 text-xs text-zinc-500">Refreshing…</p>
                  ) : null}
                  <TimesheetsTable
                    data={timesheets}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    totalPages={meta.totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                    isLoading={isLoading || isFetching}
                  />
                </>
              )}
            </CardBody>
          </Card>
        </Col>

        <CopyrightFooterCard />
      </Row>
    </main>
  );
}
