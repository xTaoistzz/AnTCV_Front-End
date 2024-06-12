import Link from "next/link";

export default function ListGuest(){
    return (
        <div id="navigation" className="flex text-center space-x-5 justify-between p-5 bg-green-200">
            <h1 className=" font-bold">AnTCV</h1>
            <div className="space-x-5">
            <Link id="sign-in" href="/auth" className=" hover:font-bold">Sign-In</Link>
            <Link id="sign-up" href="/auth" className=" hover:font-bold">Sign-Up</Link>
            </div>
        </div>
    )
}