import * as React from "react"
import { cn } from "@/lib/utils"

type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

const gapMap: Record<GapSize, string> = {
  0:  "gap-0",
  1:  "gap-1",
  2:  "gap-2",
  3:  "gap-3",
  4:  "gap-4",
  5:  "gap-5",
  6:  "gap-6",
  8:  "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
}

const gapXMap: Record<GapSize, string> = {
  0:  "gap-x-0",
  1:  "gap-x-1",
  2:  "gap-x-2",
  3:  "gap-x-3",
  4:  "gap-x-4",
  5:  "gap-x-5",
  6:  "gap-x-6",
  8:  "gap-x-8",
  10: "gap-x-10",
  12: "gap-x-12",
  16: "gap-x-16",
}

const gapYMap: Record<GapSize, string> = {
  0:  "gap-y-0",
  1:  "gap-y-1",
  2:  "gap-y-2",
  3:  "gap-y-3",
  4:  "gap-y-4",
  5:  "gap-y-5",
  6:  "gap-y-6",
  8:  "gap-y-8",
  10: "gap-y-10",
  12: "gap-y-12",
  16: "gap-y-16",
}

type RowProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Column gap (applied to both axes). Overridden by gapX / gapY if provided. */
  gap?: GapSize
  /** Horizontal (column) gap only */
  gapX?: GapSize
  /** Vertical (row) gap only */
  gapY?: GapSize
}

/**
 * Row — 12-column CSS Grid container.
 *
 * Usage:
 *   <Row gap={4}>
 *     <Col xs={12} md={6}>...</Col>
 *     <Col xs={12} md={6}>...</Col>
 *   </Row>
 */
export function Row({ gap = 4, gapX, gapY, className, children, ...rest }: RowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-12",
        gapX !== undefined ? gapXMap[gapX] : gap !== undefined ? gapMap[gap] : "",
        gapY !== undefined ? gapYMap[gapY] : "",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
