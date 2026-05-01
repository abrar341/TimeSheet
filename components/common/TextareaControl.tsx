"use client"

import * as React from "react"
import { memo } from "react"
import type { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form"
import { Controller } from "react-hook-form"
import { AlertCircle, Info } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────
type BaseProps = {
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  /** Small helper text shown below the field when there is no error */
  hint?: string
  /** Show the info icon next to the label */
  showInfo?: boolean
}

type ControlledProps<T extends FieldValues = FieldValues> = BaseProps & {
  control: Control<T>
  name: FieldPath<T>
  rules?: RegisterOptions<T>
  value?: never
  onChange?: never
}

type UncontrolledProps = BaseProps & {
  control?: never
  name?: string
  rules?: never
  value?: string
  onChange?: (value?: string) => void
}

export type TextareaControlProps<T extends FieldValues = FieldValues> =
  | ControlledProps<T>
  | UncontrolledProps

// ─── Internal helpers ─────────────────────────────────────────────────────────
const ErrorMessage = ({ id, message }: { id: string; message: string }) => (
  <div className="flex items-center gap-1 mt-1" role="alert">
    <AlertCircle className="size-4 text-red-500" aria-hidden="true" />
    <p id={id} className="text-xs font-medium text-red-600">{message}</p>
  </div>
)

// ─── Component ────────────────────────────────────────────────────────────────
export const TextareaControl = memo(<T extends FieldValues = FieldValues>(
  props: TextareaControlProps<T>,
) => {
  const {
    control,
    name = "textarea",
    label,
    placeholder = "",
    className = "",
    disabled = false,
    required = false,
    rows = 4,
    hint,
    showInfo = true,
    value,
    onChange,
    rules,
  } = props

  const isFormControl = control !== undefined
  const errorId = `${String(name)}-error`

  const renderTextarea = (
    fieldValue: string = "",
    fieldOnChange?: (value: string) => void,
    fieldOnBlur?: () => void,
    hasError = false,
  ) => (
    <Textarea
      id={String(name)}
      value={fieldValue}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      aria-required={required}
      aria-invalid={hasError}
      aria-describedby={hasError ? errorId : undefined}
      onChange={(e) => fieldOnChange?.(e.target.value)}
      onBlur={fieldOnBlur}
      className={cn(
        "text-sm text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-[#1E5CE5]/30",
        hasError && "border-red-400 focus-visible:ring-red-400/30",
      )}
    />
  )

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {label && (
        <div className="flex items-center gap-1.5">
          <Label htmlFor={String(name)} className="font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </Label>
          {showInfo && <Info className="size-3.5 text-zinc-400" />}
        </div>
      )}

      {isFormControl ? (
        <Controller
          name={name as FieldPath<T>}
          control={control as Control<T>}
          rules={rules}
          render={({ field, fieldState }) => (
            <>
              {renderTextarea(field.value ?? "", field.onChange, field.onBlur, !!fieldState.error)}
              {hint && !fieldState.error && (
                <p className="text-xs text-zinc-400">{hint}</p>
              )}
              {fieldState.error?.message && (
                <ErrorMessage id={errorId} message={fieldState.error.message} />
              )}
            </>
          )}
        />
      ) : (
        <>
          {renderTextarea(value ?? "", (v) => onChange?.(v))}
          {hint && <p className="text-xs text-zinc-400">{hint}</p>}
        </>
      )}
    </div>
  )
}) as <T extends FieldValues = FieldValues>(
  props: TextareaControlProps<T>,
) => React.ReactElement
