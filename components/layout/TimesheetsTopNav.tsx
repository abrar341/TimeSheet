"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/common/Button"
import { Row } from "@/components/grid/Row"
import { Col } from "@/components/grid/Col"
import { LOGIN_ROUTE } from "@/modules/auth/constants/auth-route.constants"

export function TimesheetsTopNav() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-3">
        <Row gap={0} className="w-full items-center">
          <Col xs={12} md={6} className="flex min-w-0 items-center gap-6">
            <span className="text-lg font-semibold tracking-tight text-zinc-900">ticktock</span>
            <nav className="text-sm font-medium text-zinc-600">
              <span className="text-zinc-900">Timesheets</span>
            </nav>
          </Col>
          <Col xs={12} md={6} className="flex items-center justify-end gap-3 pt-2 md:pt-0">
            <Button
              variant="outline-light"
              btnType="button"
              onClick={() => signOut({ callbackUrl: LOGIN_ROUTE })}
              className="h-9"
            >
              Sign out
            </Button>
          </Col>
        </Row>
      </div>
    </header>
  )
}
