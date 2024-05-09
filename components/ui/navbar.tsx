/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6zk0C5obFbl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 flex items-center h-14 px-4 border-b bg-white md:px-6 dark:bg-gray-950">
      <Link
        className="flex items-center me-4 font-bold font-serif text-lg text-red-600"
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
        <Button className="" size="sm" variant="outline">
          GitHub
        </Button>
        <Button className="" size="sm" variant="outline">
          Theme
        </Button>
      </div>
    </div>
  );
};
export default Navbar;


