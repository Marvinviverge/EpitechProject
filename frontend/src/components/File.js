import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from "../utils/useAxios"
import Navbar from './Navbar';
const File = () => {

    const api = useAxios()
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [condition, setCondition] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await api.post("/create_book/", {
                title: title,
                author: author,
                condition: condition
            })
            console.log("Book created:", response.data)
            setTitle("")
            setAuthor("")
            setCondition("")
            navigate('/dashboard')
        } catch (error) {
            console.error("Error creating book:", error)
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Super ! Quel livre veux-tu nous donner ?
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder='Le titre du livre'
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <input
                                    id="author"
                                    name="author"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setAuthor(e.target.value)}
                                    placeholder="L'auteur du livre"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <select
                                    id="condition"
                                    name="condition"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setCondition(e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>
                                        Sélectionnez l'état du livre
                                    </option>
                                    <option value="New">New</option>
                                    <option value="Good">Good</option>
                                    <option value="Damaged">Damaged</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Déposer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default File;