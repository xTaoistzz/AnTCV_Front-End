import Link from "next/link";

export default function ListGuest() {
  return (
    <div id="navigation" className="flex items-center justify-between p-4 bg-green-200">
      <h1 className="font-bold text-xl">AnTCV</h1>
      <div className="flex space-x-5">
        <Link href="/auth">
          <div id="sign-in" className="text-gray-800 hover:text-gray-900 font-medium">Sign-In</div>
        </Link>
        <Link href="/auth">
          <div id="sign-up" className="text-gray-800 hover:text-gray-900 font-medium">Sign-Up</div>
        </Link>
      </div>
    </div>
  );
}