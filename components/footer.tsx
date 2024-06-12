import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row text-xs sm:font-semibold font-normal items-center justify-center  bg-gray-300  dark:bg-gray-950 py-1">
      <div>
        Made by <Link href="#">Suraj Kr. Saw</Link> with ❤️ ,{" "}
      </div>
      <div className="ms-1 me-2">
        <Link href="#"> Buy me a Coffee</Link> may be? 🥺
      </div>
    </footer>
  );
};
export default Footer;
