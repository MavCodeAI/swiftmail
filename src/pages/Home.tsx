import { Hero } from "@/components/Hero";
import { TempMail } from "@/components/TempMail";

export function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-screen-xl px-6 py-8 relative">
        <TempMail />
      </div>
    </>
  );
}
