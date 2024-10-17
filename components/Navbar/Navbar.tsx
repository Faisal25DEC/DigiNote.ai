import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, NotepadTextIcon } from "@/assets/Icons/Icons";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between w-[92%] mx-auto h-16 md:px-6">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold"
        prefetch={false}
      >
        <NotepadTextIcon className="w-6 h-6" />
        <span>Notebot.ai</span>
      </Link>
      <nav className="hidden gap-4 md:flex items-center">
        {/* <Link
          href="#"
          className="text-sm font-medium hover:underline"
          prefetch={false}
        >
          Features
        </Link> */}
        {/* <Link
          href="#"
          className="text-sm font-medium hover:underline"
          prefetch={false}
        >
          Pricing
        </Link> */}
        {/* <Link
          href="#"
          className="text-sm font-medium hover:underline"
          prefetch={false}
        >
          About
        </Link> */}
        <Link
          href="#"
          className="text-sm font-medium hover:underline"
          prefetch={false}
        >
          Contact
        </Link>
        <Link target="_blank" href="https://github.com/kartik126/notebot.ai">
          <div>
            <Icon className="w-10 h-10" icon="mdi:github" />
          </div>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="md:hidden">
          <div className="grid gap-4 p-4">
            {/* <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Features
            </Link> */}
            {/* <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Pricing
            </Link> */}
            {/* <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              About
            </Link> */}
            <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
