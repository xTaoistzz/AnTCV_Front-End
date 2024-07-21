import Link from "next/link";

export default function ListMem() {
  return (
    <div id="navigation" className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-300 to-green-300 shadow-md">
      <Link href="/">
        <div className="font-bold text-3xl text-gray-900 hover:text-gray-900 transition-colors duration-300">AnTCV</div>
      </Link>
      
      <div className="flex space-x-6">
        <Link href="/project">
          <div className="text-gray-800 hover:text-gray-900 transition-colors duration-300 font-medium py-2 px-4 rounded-lg bg-white shadow-sm">Project</div>
        </Link>
        <Link href="/">
          <div className="text-gray-800 hover:text-gray-900 transition-colors duration-300 font-medium py-2 px-4 rounded-lg bg-white shadow-sm">Logout</div>
        </Link>
      </div>
    </div>
  );
}