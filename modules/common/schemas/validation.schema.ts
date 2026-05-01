"use client"

import * as yup from "yup"

type StringSchemaOpts = {
  label: string
  required?: boolean
  minLength?: number
  maxLength?: number
}

export const emailSchema = (opts: StringSchemaOpts) => {
  // Note: keep schema typing loose; yup inference can be `string | undefined`.
  let s: yup.StringSchema<any> = yup
    .string()
    .trim()
    .email(`${opts.label} must be a valid email`)

  if (opts.required) s = s.required(`${opts.label} is required`)
  if (typeof opts.minLength === "number")
    s = s.min(opts.minLength, `${opts.label} must be at least ${opts.minLength} characters`)
  if (typeof opts.maxLength === "number")
    s = s.max(opts.maxLength, `${opts.label} must be at most ${opts.maxLength} characters`)

  return s
}

export const passwordSchema = (opts: StringSchemaOpts) => {
  // Note: keep schema typing loose; yup inference can be `string | undefined`.
  let s: yup.StringSchema<any> = yup.string().trim()

  if (opts.required) s = s.required(`${opts.label} is required`)
  if (typeof opts.minLength === "number")
    s = s.min(opts.minLength, `${opts.label} must be at least ${opts.minLength} characters`)
  if (typeof opts.maxLength === "number")
    s = s.max(opts.maxLength, `${opts.label} must be at most ${opts.maxLength} characters`)

  return s
}

export const nameSchema = (opts: StringSchemaOpts) => {
  // Generic name/code-like string
  let s: yup.StringSchema<any> = yup.string().trim()

  if (opts.required) s = s.required(`${opts.label} is required`)
  if (typeof opts.minLength === "number")
    s = s.min(opts.minLength, `${opts.label} must be at least ${opts.minLength} characters`)
  if (typeof opts.maxLength === "number")
    s = s.max(opts.maxLength, `${opts.label} must be at most ${opts.maxLength} characters`)

  return s
}

