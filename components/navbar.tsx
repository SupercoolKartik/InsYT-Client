/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6zk0C5obFbl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VscGithub } from "react-icons/vsc";
import { TbSunLow } from "react-icons/tb";
import { PiMoonStarsBold } from "react-icons/pi";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <div className="w-full fixed top-0 flex items-center h-14 px-4 border-b bg-gray-200 md:px-6 dark:bg-gray-950 rounded-b-md">
      <Link
        className="flex items-center me-4 font-bold font-serif text-2xl text-red-600"
        href="/"
      >
        insYT
      </Link>
      <nav className="hidden sm:flex items-center space-x-4 flex-1">
        {/* <Link className="font-medium" href="#">
          Home
        </Link>
        <Link className="font-medium" href="#">
          About
        </Link>
        <Link className="font-medium" href="#">
          Contact
        </Link> */}
      </nav>
      <div className="buttons flex absolute right-2">
        <Button
          className="hidden dark:flex  text-lg"
          size="sm"
          variant="outline"
          onClick={() => setTheme("light")}
          title="Turn on the light mode"
        >
          <TbSunLow />
        </Button>
        <Button
          className="dark:hidden text-lg"
          size="sm"
          variant="outline"
          onClick={() => setTheme("dark")}
          title="Turn off the light mode"
        >
          <PiMoonStarsBold />
        </Button>
        <Button className="text-lg " size="sm" variant="outline">
          <Link
            target="_blank"
            title="GitHub"
            href="https://github.com/SupercoolKartik/InsYT-Client"
          >
            <VscGithub />
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
