import Link from "next/link";

export default function ListMem() {
  return (
    <div id="navigation" className="flex items-center justify-between p-4 bg-green-200">
      <h1 className="font-bold text-xl text-violet-950">AnTCV</h1>
      <div className="flex space-x-5">
        <Link href="/project">
          <div className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium">Project</div>
        </Link>
        <Link href="/">
          <div className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium">Logout</div>
        </Link>
      </div>
    </div>
  );
}