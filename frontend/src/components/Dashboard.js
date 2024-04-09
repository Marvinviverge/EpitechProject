import { useState, useEffect, useCallback } from 'react';
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

export default function Dashboard() {
    const [books, setBooks] = useState([])
    const [borrowedBookId, setBorrowedBookId] = useState(null)
    const [borrowResponse, setBorrowResponse] = useState('')
    const api = useAxios()
    const token = localStorage.getItem("authTokens")

    let username = ''

    if (token) {
        const decode = jwtDecode(token)
        username = decode.username
    }

    const fetchGetData = useCallback(async () => {
        try {
            const response = await api.get("/dashboard/");
            const borrowedBooks = response.data.books.filter(book => book.borrower === username);
            setBooks(borrowedBooks)
        } catch (error) {
            console.log(error)
            setBooks("Une erreur s'est produite !")
        }
    }, [api, username])


    const handleBorrow = async (bookId) => {
        try {
            const response = await api.put(`/library/${bookId}/`, { borrower: "delete" })
            setBorrowedBookId(bookId)
            setBorrowResponse(response)
            console.log(borrowResponse)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchGetData()
    }, [fetchGetData, borrowedBookId])

    return (
        <>
            <Navbar />
            <main className='flex flex-col items-center'>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <p>Bonjour {username} ! Que souhaites-tu faire aujourd'hui ?</p>
                </div>
                <div className='flex space-x-4 mt-2'>
                    <NavLink to="/file">
                        <button className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Je veux déposer un livre !</button>
                    </NavLink>
                    <NavLink to="/library">
                        <button className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Je veux emprunter un livre !</button>
                    </NavLink>
                </div>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <p>Voici les livres que tu as déjà en ta possession. N'oublies pas de les rendres quand tu as terminé !</p>
                </div>
                <ul className="m-5 w-2/3 grid grid-cols-3 gap-5">
                    {
                        books.map(book => (
                            <li key={book.id} className="border">
                                <div className="">
                                    <div className="flex flex-col gap-2 p-10">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{book.title}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Auteur: {book.author}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">État du livre: {book.condition}</p>
                                        <button onClick={() => handleBorrow(book.id)} className="flex w-1/2 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Rendre</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </main>
        </>
    )
}