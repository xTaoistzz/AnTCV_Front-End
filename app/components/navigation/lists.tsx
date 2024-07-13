import Link from "next/link";

export default function ListGuest() {
  return (
    <div id="navigation" className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-200 to-green-200 shadow-md">
      <Link href="/">
        <div className="font-bold text-3xl text-gray-900 hover:text-gray-900 transition-colors duration-300">AnTCV</div>
      </Link>
      
      <div className="flex space-x-5">
        <Link href="/auth">
          <div id="sign-in" className="text-gray-800 hover:text-gray-900 transition-colors duration-300 font-medium">Sign-In</div>
        </Link>
        <Link href="/auth">
          <div id="sign-up" className="text-gray-800 hover:text-gray-900 transition-colors duration-300 font-medium">Sign-Up</div>
        </Link>
      </div>
    </div>
  );
}