import Link from "next/link";

export default function Navbar() {
  return (
    <div id="navigation" className="flex items-center justify-between p-4 bg-green-200">
      <h1 className="font-bold text-xl text-violet-950">AnTCV</h1>
      <div className="flex space-x-5">
        <Link href="/project">
          <div id="project-link" className="text-gray-800 hover:text-gray-900 font-medium">
            Project
          </div>
        </Link>
        <Link href="/">
          <div id="logout-link" className="text-gray-800 hover:text-gray-900 font-medium">
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
}