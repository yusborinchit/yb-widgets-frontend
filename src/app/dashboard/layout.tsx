import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({ children }: Readonly<Props>) {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  return children;
}
