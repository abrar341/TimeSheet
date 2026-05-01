"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export type SelectOption<T extends string = string> = {
  label: string
  value: T
}

type SelectSize = "sm" | "md" | "lg"

type SelectProps<T extends string = string> = {
  value: T
  onChange: (value: T) => void
  options: SelectOption<T>[]
  placeholder?: string
  size?: SelectSize
  disabled?: boolean
  className?: string
}

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

export function Select<T extends string = string>({
  value,
  onChange,
  options,
  placeholder,
  size = "md",
  disabled = false,
  className,
}: SelectProps<T>) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        disabled={disabled}
        className={cn(
          "appearance-none rounded-lg border border-zinc-200 bg-white py-0 font-normal text-zinc-700",
          "focus:outline-none focus:ring-2 focus:ring-[#1E5CE5]/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[size],
          className
        )}
      >
        {placeholder !== undefined && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className={cn(
          "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500",
          chevronSize[size]
        )}
      />
    </div>
  )
}
