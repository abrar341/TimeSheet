import * as React from "react"
import { cn } from "@/lib/utils"

type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | "full"

const spanMap: Record<string, string> = {
  1:    "col-span-1",
  2:    "col-span-2",
  3:    "col-span-3",
  4:    "col-span-4",
  5:    "col-span-5",
  6:    "col-span-6",
  7:    "col-span-7",
  8:    "col-span-8",
  9:    "col-span-9",
  10:   "col-span-10",
  11:   "col-span-11",
  12:   "col-span-12",
  auto: "col-auto",
  full: "col-span-full",
}

const smMap: Record<string, string> = {
  1:    "sm:col-span-1",
  2:    "sm:col-span-2",
  3:    "sm:col-span-3",
  4:    "sm:col-span-4",
  5:    "sm:col-span-5",
  6:    "sm:col-span-6",
  7:    "sm:col-span-7",
  8:    "sm:col-span-8",
  9:    "sm:col-span-9",
  10:   "sm:col-span-10",
  11:   "sm:col-span-11",
  12:   "sm:col-span-12",
  auto: "sm:col-auto",
  full: "sm:col-span-full",
}

const mdMap: Record<string, string> = {
  1:    "md:col-span-1",
  2:    "md:col-span-2",
  3:    "md:col-span-3",
  4:    "md:col-span-4",
  5:    "md:col-span-5",
  6:    "md:col-span-6",
  7:    "md:col-span-7",
  8:    "md:col-span-8",
  9:    "md:col-span-9",
  10:   "md:col-span-10",
  11:   "md:col-span-11",
  12:   "md:col-span-12",
  auto: "md:col-auto",
  full: "md:col-span-full",
}

const lgMap: Record<string, string> = {
  1:    "lg:col-span-1",
  2:    "lg:col-span-2",
  3:    "lg:col-span-3",
  4:    "lg:col-span-4",
  5:    "lg:col-span-5",
  6:    "lg:col-span-6",
  7:    "lg:col-span-7",
  8:    "lg:col-span-8",
  9:    "lg:col-span-9",
  10:   "lg:col-span-10",
  11:   "lg:col-span-11",
  12:   "lg:col-span-12",
  auto: "lg:col-auto",
  full: "lg:col-span-full",
}

const xlMap: Record<string, string> = {
  1:    "xl:col-span-1",
  2:    "xl:col-span-2",
  3:    "xl:col-span-3",
  4:    "xl:col-span-4",
  5:    "xl:col-span-5",
  6:    "xl:col-span-6",
  7:    "xl:col-span-7",
  8:    "xl:col-span-8",
  9:    "xl:col-span-9",
  10:   "xl:col-span-10",
  11:   "xl:col-span-11",
  12:   "xl:col-span-12",
  auto: "xl:col-auto",
  full: "xl:col-span-full",
}

type ColProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Default span (mobile-first, all breakpoints) */
  xs?: Span
  /** ≥640 px */
  sm?: Span
  /** ≥768 px */
  md?: Span
  /** ≥1024 px */
  lg?: Span
  /** ≥1280 px */
  xl?: Span
}

/**
 * Col — responsive grid column for use inside <Row>.
 *
 * Usage:
 *   <Col xs={12} sm={6} lg={4}>...</Col>
 */
export function Col({ xs = 12, sm, md, lg, xl, className, children, ...rest }: ColProps) {
  return (
    <div
      className={cn(
        spanMap[xs],
        sm  !== undefined ? smMap[sm]   : "",
        md  !== undefined ? mdMap[md]   : "",
        lg  !== undefined ? lgMap[lg]   : "",
        xl  !== undefined ? xlMap[xl]   : "",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
