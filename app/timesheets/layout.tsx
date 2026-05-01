import type { ReactNode } from "react"

import { TimesheetsTopNav } from "@/components/layout/TimesheetsTopNav"

export default function TimesheetsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-svh bg-zinc-50">
      <TimesheetsTopNav />
      {children}
    </div>
  )
}
