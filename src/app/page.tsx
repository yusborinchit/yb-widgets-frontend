import MainContainer from "~/components/container/main-container";
import Header from "~/components/header";

export default async function HomePage() {
  return (
    <>
      <Header />
      <MainContainer as="main">Hello World</MainContainer>
    </>
  );
}
