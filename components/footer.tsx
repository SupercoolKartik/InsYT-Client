import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center absolute bottom-0 bg-gray-200  dark:bg-gray-950 py-1">
      <span className="text-sm font-serif">
        Made by <Link href="#">Suraj Kr. Saw</Link> with ❤️ ,{" "}
        <Link href="#">Buy me a Coffee</Link> may be? 🥺
      </span>
    </footer>
  );
};
export default Footer;
