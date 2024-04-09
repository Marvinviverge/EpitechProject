import React, { useState, useEffect, useCallback } from 'react';
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import Navbar from './Navbar';

const Library = () => {
    const api = useAxios()
    const [books, setBooks] = useState([])
    const [borrowResponse, setBorrowResponse] = useState('')
    const [borrowedBookId, setBorrowedBookId] = useState(null)
    const [sortOption, setSortOption] = useState('title')

    const token = localStorage.getItem("authTokens")
    let username = ''

    if (token) {
        const decode = jwtDecode(token)
        username = decode.username
    }

    const fetchGetData = useCallback(async () => {
        try {
            const response = await api.get("/library/")
            let sortedBooks = [...response.data.books]

            const compareCondition = (a, b) => {
                const order = { 'New': 0, 'Good': 1, 'Damaged': 2 }
                return order[a.condition] - order[b.condition]
            };

            // Tri des livres en fonction de l'option sélectionnée
            if (sortOption === 'author') {
                sortedBooks.sort((a, b) => a.author.localeCompare(b.author))
            } else if (sortOption === 'condition') {
                sortedBooks.sort((a, b) => compareCondition(a, b));
            } else {
                sortedBooks.sort((a, b) => a.title.localeCompare(b.title))
            }

            setBooks(sortedBooks)
        } catch (error) {
            console.log(error)
            setBooks("Une erreur s'est produite !")
        }
    }, [api, sortOption])

    const handleBorrow = async (bookId) => {
        try {
            const response = await api.put(`/library/${bookId}/`, { borrower: username });
            setBorrowedBookId(bookId)
            setBorrowResponse(response)
            console.log(borrowResponse)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchGetData()
    }, [fetchGetData, borrowedBookId, sortOption])

    const handleSortChange = (event) => {
        setSortOption(event.target.value)
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-end m-5">
                <label htmlFor="sort-select" className="mr-2">Trier par :</label>
                <select id="sort-select" value={sortOption} onChange={handleSortChange}>
                    <option value="title">Titre</option>
                    <option value="author">Auteur</option>
                    <option value="condition">État du livre</option>
                </select>
            </div>
            <ul className="m-5 grid grid-cols-3 gap-5">
                {books.map(book => (
                    <li key={book.id} className="border">
                        <div className="">
                            <div className="flex flex-col gap-2 p-10">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{book.title}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Auteur: {book.author}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">État du livre: {book.condition}</p>
                                <button onClick={() => handleBorrow(book.id)} className="flex w-1/3 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Emprunter</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Library;
