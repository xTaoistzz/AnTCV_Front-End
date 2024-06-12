import Link from "next/link";

export default function ListGuest(){
    return (
        <div id="navigation" className="flex text-center space-x-6 justify-between p-5 pl-10 bg-green-200">
            <h1 className=" font-bold text-xl text-violet-950">AnTCV</h1>
            <div className="space-x-5">
            <div></div>
            <Link id="sign-in" href="/project" className=" hover:font-bold">Project</Link>
            <Link id="sign-up" href="/" className=" hover:font-bold">Logout</Link>
            </div>
        </div>
    )
}