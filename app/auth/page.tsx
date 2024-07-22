"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "../components/auth/login";

export default function Auth() {
  const [owner, setOwner] = useState('');

const router = useRouter()
const fetchOwner = async () => {
  try {
    const res = await fetch(`${process.env.ORIGIN_URL}/returnUsername`, { credentials: 'include' });
    if(res.ok) {
      router.push('/project')
    }
  } catch (error) {
    console.error('Error fetching owner:', error);
  }
};

useEffect(()=>{
  fetchOwner()
})
  return (
    <div className="">
      <Login />
    </div>
    
  );
}