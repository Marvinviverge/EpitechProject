import { useState, useEffect } from 'react'
import useAxios from "../utils/useAxios"
import { jwtDecode } from "jwt-decode";
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
export default function Dashboard() {

    const [res, setRes] = useState("")
    const api = useAxios();
    const token = localStorage.getItem("authTokens")

    let username = ''

    if (token) {
        const decode = jwtDecode(token)
        username = decode.username
    }

    useEffect(() => {
        const fetchGetData = async () => {
            try {
                const response = await api.get("/dashboard/")
                setRes(response.data.response)
            } catch (error) {
                console.log(error);
                setRes("Something went wrong")
            }
        }
        fetchGetData()
    }, [])


    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await api.post("/dashboard/")
                setRes(response.data.response)
            } catch (error) {
                console.log(error);
                setRes("Something went wrong")
            }
        }
        fetchPostData()
    }, [])


    return (
        <>
            <Navbar />
            <main className='flex flex-col items-center'>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <p>Bonjour {username} ! Que souhaites-tu faire aujourd'hui ?</p>
                </div>
                <div className='flex space-x-4 mt-10'>
                    <NavLink to="#">
                        <button className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Je veux déposer un livre !</button>
                    </NavLink>
                    <NavLink to="#">
                        <button className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Je veux emprunter un livre !</button>
                    </NavLink>
                </div>
            </main>
        </>
    )
}