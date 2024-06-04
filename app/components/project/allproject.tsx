import { useState, useEffect } from "react";
export default function All(){
    const [data, setData] = useState('')
    useEffect(()=> {
        const fetchdata = async () => {
            const res = await fetch('http://localhost:5000/allProject')
            const data = await res.json()
            setData(data)
        }
        fetchdata()
    }, [])
    return data ?
}