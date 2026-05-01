import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/modules/auth/constants/auth-route.constants";

export default function Home() {
  redirect(LOGIN_ROUTE);
}
