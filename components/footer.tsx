import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row text-xs sm:font-semibold font-normal items-center justify-center  bg-gray-300  dark:bg-gray-950 py-1">
      <div>
        Made by{" "}
        <a
          href="https://www.linkedin.com/in/suraj-kr-saw/"
          target="_blank"
          className="cursor-pointer text-purple-800 dark:text-purple-300"
        >
          Suraj Kr. Saw
        </a>{" "}
        with ❤️ ,{" "}
      </div>
      <div className="ms-1 me-2">
        <a
          href="https://www.buymeacoffee.com/surajsaw"
          target="_blank"
          className="cursor-pointer text-purple-800 dark:text-purple-300"
        >
          {" "}
          Buy me a coffee
        </a>{" "}
        may be? 🥺
      </div>
    </footer>
  );
};
export default Footer;
