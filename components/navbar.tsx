import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VscGithub } from "react-icons/vsc";
import { TbSunLow } from "react-icons/tb";
import { PiMoonStarsBold } from "react-icons/pi";
import { useTheme } from "next-themes";
import { libreBarcode128Text } from "../fonts/fonts";

const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <div className="w-full flex items-center h-14 px-4 sticky top-0 border-b bg-gray-200 md:px-6 dark:bg-gray-950">
      <Link
        className={`${libreBarcode128Text.className} flex items-center me-4 font-semibold text-5xl text-red-600`}
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
