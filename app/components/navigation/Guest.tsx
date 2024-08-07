import Link from "next/link";

export default function ListGuest() {
  return (
    <div id="navigation" className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-200 to-green-300 shadow-md">
      <Link href="/">
        <div className="flex items-center">
          <img
            src="/favicon.ico"
            alt="Site Icon"
            className="h-12 rounded-full" // Adjust the size as needed
          />
          <span className="ml-2 font-bold text-3xl text-gray-900 hover:text-gray-900 transition-colors duration-300">
            AnTCV
          </span>
        </div>
      </Link>
      
      <div className="flex space-x-5">
        <Link href="/auth">
          <div id="sign-in" className="bg-white text-gray-800 hover:bg-orange-400 transition-colors duration-300 hover:text-white font-medium  rounded-lg p-2">Get Started</div>
        </Link>
      </div>
    </div>
  );
}