"use client"

import { useState } from "react";
import Login from "../components/auth/login";
import Register from "../components/auth/register";

export default function Auth() {

    const [auth, setAuth] = useState('login');
    
    return (
        <div>

        {auth==='register'&&<Register/>}
        {auth==='login'&&<Login/>}</div>
    )
}
