import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
    try {
        const formData = await req.json();
        const res = await fetch("http://localhost:5000/login", {
            method : 'POST',
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(formData),
            credentials : 'same-origin'
        });
        const data = await res.json();
        return NextResponse.json(data)
    } catch (error) {

    }
}