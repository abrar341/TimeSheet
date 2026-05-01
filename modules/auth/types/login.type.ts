export type loginType = {
  email: string
  password: string
}

export const toLoginType = (data: any): loginType => {
  return {
    email: typeof data?.email === "string" ? data.email.trim() : "",
    password: typeof data?.password === "string" ? data.password : "",
  }
}

