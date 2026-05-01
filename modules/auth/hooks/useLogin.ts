"use client"

import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { type Resolver, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { loginSchema } from "@/modules/auth/schemas/login.schema"
import { toLoginType, type loginType } from "@/modules/auth/types/login.type"
import { DASHBOARD_ROUTE } from "@/modules/auth/constants/auth-route.constants"

export function useLogin() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  type LoginFormValues = {
    email: string
    password: string
  }

  const form = useForm<LoginFormValues>({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema) as unknown as Resolver<LoginFormValues>,
    defaultValues: { email: "", password: "" },
  })

  const submitHandler = form.handleSubmit(async (values) => {
    setError(null)
    setIsPending(true)

    try {
      const payload = toLoginType(values)
      const result = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      })

      if (!result || result.error) {
        setError("Invalid email or password.")
        return
      }

      router.push(DASHBOARD_ROUTE)
    } finally {
      setIsPending(false)
    }
  })

  return {
    form,
    submitHandler,
    isPending,
    error,
  }
}

