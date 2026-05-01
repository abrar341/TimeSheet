"use client"

import { InputControl } from "@/components/common/InputControl"
import { useLogin } from "@/modules/auth/hooks/useLogin"
import {Button} from "@/components/common/Button";

export function LoginForm() {
  const { form, submitHandler, isPending, error } = useLogin()

  return (
    <div className="sm:p-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Welcome back
        </h1>
      </div>

      <form onSubmit={submitHandler} className="mt-6 space-y-5">
        <InputControl
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="name@example.com"
          required
          rules={{ required: "Email is required" }}
          className="space-y-2"
        />

        <InputControl
          control={form.control}
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
          rules={{ required: "Password is required" }}
          className="space-y-2"
        />

        <label className="flex items-center gap-2 text-sm text-zinc-600">
          <input
            type="checkbox"
            className="size-4 rounded border-zinc-300 text-sky-600 focus:ring-sky-500/30"
          />
          Remember me
        </label>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <Button
          btnType="submit"
          isLoading={isPending}
          className="h-11 w-full rounded-lg bg-[#1E5CE5] text-white hover:bg-[#184BC0] focus-visible:ring-[#1E5CE5]/30"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  )
}

