import { redirect } from "next/navigation";
import MainContainer from "~/components/container/main-container";
import Footer from "~/components/footer";
import Header from "~/components/header";
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

  return (
    <>
      <Header />
      <MainContainer as="main">{children}</MainContainer>
      <Footer />
    </>
  );
}
