"use client"

import * as React from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import {
  Button as ShadButton,
  type buttonVariants as _buttonVariants,
} from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "light"
  | "dark"
  | "ghost"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-light"
  | "outline-dark"

export type ButtonSize = "sm" | "md" | "lg"

type AppButtonProps = Omit<React.ComponentProps<"button">, "type"> & {
  icon?: React.ReactElement
  label?: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  to?: string
  href?: string
  isLoading?: boolean
  btnType?: "link" | "button" | "submit" | "reset"
}

function mapVariant(variant: ButtonVariant | undefined) {
  switch (variant) {
    case "secondary":
      return { shadcnVariant: "secondary" as const, className: "" }
    case "ghost":
      return { shadcnVariant: "ghost" as const, className: "" }
    case "danger":
      return { shadcnVariant: "destructive" as const, className: "" }

    case "light":
      return { shadcnVariant: "outline" as const, className: "bg-muted/30" }
    case "dark":
      return {
        shadcnVariant: "default" as const,
        className:
          "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
      }

    case "success":
      return {
        shadcnVariant: "default" as const,
        className:
          "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-600/30",
      }
    case "warning":
      return {
        shadcnVariant: "default" as const,
        className:
          "bg-amber-400 text-amber-950 hover:bg-amber-500 focus-visible:ring-amber-500/30",
      }

    case "outline-primary":
      return {
        shadcnVariant: "outline" as const,
        className:
          "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      }
    case "outline-secondary":
      return {
        shadcnVariant: "outline" as const,
        className:
          "border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground",
      }
    case "outline-success":
      return {
        shadcnVariant: "outline" as const,
        className:
          "border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white",
      }
    case "outline-danger":
      return {
        shadcnVariant: "outline" as const,
        className:
          "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground",
      }
    case "outline-warning":
      return {
        shadcnVariant: "outline" as const,
        className:
          "border-amber-400 text-amber-700 hover:bg-amber-400 hover:text-amber-950",
      }
    case "outline-light":
      return {
        shadcnVariant: "outline" as const,
        className: "border-border text-foreground hover:bg-muted",
      }
    case "outline-dark":
      return {
        shadcnVariant: "outline" as const,
        className:
          "border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-zinc-200 dark:text-zinc-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-900",
      }

    case "primary":
    default:
      return { shadcnVariant: "default" as const, className: "" }
  }
}

function mapSize(size: ButtonSize | undefined) {
  switch (size) {
    case "sm":
      return "sm" as const
    case "lg":
      return "lg" as const
    case "md":
    default:
      return "default" as const
  }
}

export function Button({
  icon,
  label,
  variant = "primary",
  size = "md",
  className,
  to,
  href,
  isLoading,
  btnType = "button",
  disabled,
  children,
  ...rest
}: AppButtonProps) {
  const { shadcnVariant, className: variantClassName } = mapVariant(variant)
  const shadcnSize = mapSize(size)

  const content = (
    <>
      {isLoading ? <Loader2 className="animate-spin" /> : icon ?? null}
      {label ?? children ? (
        <span className="text-nowrap">{label ?? children}</span>
      ) : null}
    </>
  )

  if (btnType === "link") {
    const linkHref = href ?? to ?? "/"
    return (
      <ShadButton
        asChild
        variant={shadcnVariant}
        size={shadcnSize}
        className={cn(variantClassName, className)}
        aria-disabled={isLoading}
      >
        <Link href={linkHref}>{content}</Link>
      </ShadButton>
    )
  }

  return (
    <ShadButton
      variant={shadcnVariant}
      size={shadcnSize}
      className={cn(variantClassName, className)}
      type={btnType}
      disabled={disabled ?? Boolean(isLoading)}
      {...rest}
    >
      {content}
    </ShadButton>
  )
}

