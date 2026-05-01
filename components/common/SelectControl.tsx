"use client"

import * as React from "react"
import { memo } from "react"
import type { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form"
import { Controller } from "react-hook-form"
import { AlertCircle, ChevronDown, Info } from "lucide-react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// ─── Option types ─────────────────────────────────────────────────────────────
export type SelectOption<T extends string = string> = {
  label: string
  value: T
}

type SelectSize = "sm" | "md" | "lg"

const sizeClasses: Record<SelectSize, string> = {
  sm: "h-8 pl-2.5 pr-7 text-xs",
  md: "h-9 pl-3 pr-8 text-sm",
  lg: "h-10 pl-3.5 pr-9 text-sm",
}

const chevronSize: Record<SelectSize, string> = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
}

function normalizeOptions(
  options: SelectOption[] | readonly string[],
): SelectOption[] {
  if (options.length === 0) return []
  if (typeof options[0] === "string") {
    return (options as readonly string[]).map((o) => ({ label: o, value: o }))
  }
  return options as SelectOption[]
}

// ─── Internal helpers ─────────────────────────────────────────────────────────
const ErrorMessage = ({ id, message }: { id: string; message: string }) => (
  <div className="flex items-center gap-1 mt-1" role="alert">
    <AlertCircle className="size-4 text-red-500" aria-hidden="true" />
    <p id={id} className="text-xs font-medium text-red-600">
      {message}
    </p>
  </div>
)

// ─── Types ────────────────────────────────────────────────────────────────────
type BaseProps = {
  /** Accepts either SelectOption[] or a plain readonly string[] */
  options: SelectOption[] | readonly string[]
  placeholder?: string
  size?: SelectSize
  /** Stretches to fill container width. Defaults to true when a label is given. */
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  // form-field extras (ignored when no label is rendered)
  label?: string
  required?: boolean
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
  onChange?: (value: string) => void
}

export type SelectControlProps<T extends FieldValues = FieldValues> =
  | ControlledProps<T>
  | UncontrolledProps

// ─── Component ────────────────────────────────────────────────────────────────
export const SelectControl = memo(<T extends FieldValues = FieldValues>(
  props: SelectControlProps<T>,
) => {
  const {
    control,
    name = "select",
    label,
    placeholder,
    size = "md",
    fullWidth,
    className = "",
    disabled = false,
    required = false,
    showInfo = true,
    options,
    value,
    onChange,
    rules,
  } = props

  const isFormControl = control !== undefined
  const errorId = `${String(name)}-error`
  const normalized = normalizeOptions(options)

  // full-width defaults true when there is a label (form context), false otherwise
  const isFullWidth = fullWidth !== undefined ? fullWidth : Boolean(label)

  const renderSelect = (
    fieldValue: string = "",
    fieldOnChange?: (value: string) => void,
    hasError = false,
  ) => (
    <div className={cn("relative items-center", isFullWidth ? "flex w-full" : "inline-flex")}>
      <select
        id={label ? String(name) : undefined}
        value={fieldValue}
        onChange={(e) => fieldOnChange?.(e.target.value)}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={cn(
          "appearance-none rounded-lg border border-zinc-200 bg-white font-normal",
          "focus:outline-none focus:ring-2 focus:ring-[#1E5CE5]/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isFullWidth && "w-full",
          sizeClasses[size],
          hasError && "border-red-400",
          !fieldValue ? "text-zinc-400" : "text-zinc-700",
          className,
        )}
      >
        {placeholder !== undefined && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {normalized.map((o) => (
          <option key={o.value} value={o.value} className="text-zinc-700">
            {o.label}
          </option>
        ))}
      </select>

      <ChevronDown
        className={cn(
          "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500",
          chevronSize[size],
        )}
      />
    </div>
  )

  return (
    <div className={cn(label ? "flex flex-col space-y-2" : "contents")}>
      {label && (
        <div className="flex items-center gap-1.5">
          <Label htmlFor={String(name)} className="font-medium text-gray-700">
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
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
              {renderSelect(field.value ?? "", field.onChange, !!fieldState.error)}
              {fieldState.error?.message && (
                <ErrorMessage id={errorId} message={fieldState.error.message} />
              )}
            </>
          )}
        />
      ) : (
        renderSelect(value ?? "", onChange)
      )}
    </div>
  )
}) as <T extends FieldValues = FieldValues>(
  props: SelectControlProps<T>,
) => React.ReactElement
