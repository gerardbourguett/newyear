import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white dark:text-slate-950 bg-zinc-950 dark:bg-white min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
      <main className="flex flex-col gap-8 items-center justify-center">
        {" "}
        {/* Se elimina sm:items-start */}
        <div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight">
            #2025<span className="text-red-500">Live</span>
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Button className="text-center text-lg md:text-xl mt-4 mb-4">
            <Link href="/chao2024">#RoadTo2025</Link>
          </Button>
          <Button
            className="text-center text-lg md:text-xl mt-4 mb-4"
            variant={"destructive"}
            disabled
          >
            <Loader2 className="animate-spin" /> Dec 31, 2024 10:00 UTC
          </Button>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
