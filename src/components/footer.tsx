import MainContainer from "./container/main-container";

export default function Footer() {
  return (
    <div className="bg-foreground">
      <MainContainer
        as="footer"
        className="mt-24 flex flex-col items-center justify-between py-4 md:flex-row"
      >
        <a
          href="https://www.github.com/yusborinchit"
          target="_blank"
          className="font-medium tracking-tighter text-background"
        >
          @github/yusborinchit
        </a>
        <p className="text-sm tracking-tighter text-neutral-500">
          Made with ❤ and Next.js{" "}
        </p>
      </MainContainer>
    </div>
  );
}
