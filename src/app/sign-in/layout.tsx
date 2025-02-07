interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Sign In",
};

export default async function SignInLayout({ children }: Readonly<Props>) {
  return children;
}
