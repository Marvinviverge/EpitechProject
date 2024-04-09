import React, { useState, useEffect, useCallback, useRef } from 'react';
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import Navbar from './Navbar';

const Library = () => {
    const api = useAxios()
    const [books, setBooks] = useState([])
    const [borrowResponse, setBorrowResponse] = useState('')
    const [borrowedBookId, setBorrowedBookId] = useState(null)
    const [sortOption, setSortOption] = useState('title')
    const [filterOption, setFilterOption] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const booksPerPage = 15
    const totalPagesRef = useRef(0)

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
            }

            // Tri
            if (sortOption === 'author') {
                sortedBooks.sort((a, b) => a.author.localeCompare(b.author))
            } else if (sortOption === 'condition') {
                sortedBooks.sort((a, b) => compareCondition(a, b))
            } else {
                sortedBooks.sort((a, b) => a.title.localeCompare(b.title))
            }

            // Filtrage
            if (filterOption !== 'all') {
                sortedBooks = sortedBooks.filter(book => book.genre === filterOption)
            }

            // Pagination
            const indexOfLastBook = currentPage * booksPerPage // Le dernier livre de la liste
            const indexOfFirstBook = indexOfLastBook - booksPerPage // Le premier livre de la liste
            const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook) // La liste des livres à afficher

            setBooks(currentBooks)
            totalPagesRef.current = Math.ceil(sortedBooks.length / booksPerPage)

        } catch (error) {
            console.log(error)
            setBooks("Une erreur s'est produite !")
        }
    }, [api, sortOption, filterOption, currentPage])

    const handleBorrow = async (bookId) => {
        try {
            const response = await api.put(`/library/${bookId}/`, { borrower: username })
            setBorrowedBookId(bookId)
            setBorrowResponse(response)
            console.log(borrowResponse)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGetData()
    }, [fetchGetData, borrowedBookId, sortOption, filterOption, currentPage])

    const handleSortChange = (event) => {
        setSortOption(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value)
    }

    // Revenir à la page précédente
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Passer à la page suivante
    const handleNextPage = () => {
        if (currentPage < totalPagesRef.current) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-between mx-10">
                <div className="flex items-center justify-end m-5">
                    <label htmlFor="sort-select" className="mr-2">Trier par :</label>
                    <select id="sort-select" value={sortOption} onChange={handleSortChange}>
                        <option value="title">Titre</option>
                        <option value="author">Auteur</option>
                        <option value="condition">État du livre</option>
                    </select>
                </div>
                <div className="flex items-center justify-end m-5">
                    <label htmlFor="filter-select" className="mr-2">Filtrer par :</label>
                    <select id="filter-select" value={filterOption} onChange={handleFilterChange}>
                        <option value="all">Tous les genres</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Dystopie">Dystopie</option>
                        <option value="Littérature classique">Littérature classique</option>
                        <option value="Romance">Romance</option>
                        <option value="Jeunesse">Jeunesse</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
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
            <div className="flex justify-center gap-20 my-20">
                <button onClick={handlePrevPage} className="flex justify-center rounded-md bg-neutral-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Page précédente</button>
                <button onClick={handleNextPage} className="flex justify-center rounded-md bg-neutral-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Page suivante</button>
            </div>
        </>
    );
};

export default Library;
