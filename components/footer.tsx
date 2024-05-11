import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row text-xs sm:text-sm items-center justify-center absolute bottom-0 bg-gray-200  dark:bg-gray-950 py-1">
      {/* <div className="text-xs font-serif flex flex-col "> */}
      <div>
        Made by <Link href="#">Suraj Kr. Saw</Link> with ❤️ ,{" "}
      </div>
      <div className="ms-1 me-2">
        <Link href="#"> Buy me a Coffee</Link> may be? 🥺
      </div>
      {/* </div> */}
    </footer>
  );
};
export default Footer;
