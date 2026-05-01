import { describe, expect, it } from "vitest"

import { timesheetEntrySchema } from "@/modules/timesheets/schemas/timesheet-entry.schema"

describe("timesheetEntrySchema", () => {
  it("accepts a valid entry", async () => {
    const valid = await timesheetEntrySchema.validate(
      {
        project: "Project A",
        workType: "Bug fixes",
        description: "Fix login redirect",
        hours: 4,
      },
      { abortEarly: false }
    )

    expect(valid.project).toBe("Project A")
  })

  it("rejects missing required fields", async () => {
    await expect(
      timesheetEntrySchema.validate(
        { project: "", workType: "", description: "", hours: "" as any },
        { abortEarly: false }
      )
    ).rejects.toBeTruthy()
  })
})

