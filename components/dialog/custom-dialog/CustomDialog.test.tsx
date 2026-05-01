import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import { CustomDialog } from "@/components/dialog/custom-dialog/CustomDialog"
import { CustomDialogHeader } from "@/components/dialog/custom-dialog/CustomDialogHeader"
import { CustomDialogBody } from "@/components/dialog/custom-dialog/CustomDialogBody"

describe("CustomDialog", () => {
  it("renders content when visible", () => {
    const onHide = vi.fn()
    render(
      <CustomDialog visible onHide={onHide} size="sm">
        <CustomDialogHeader onHide={onHide} title="Add New Entry" />
        <CustomDialogBody>Body</CustomDialogBody>
      </CustomDialog>
    )

    expect(screen.getByText("Add New Entry")).toBeInTheDocument()
    expect(screen.getByText("Body")).toBeInTheDocument()
  })
})

