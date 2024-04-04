import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-red-600">Bienvenue sur ce projet destiné à l'école Epitech</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Connecter les esprits, développer l'avenir.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Les livres sont les clés qui ouvrent les portes de l'imaginaire, les fenêtres sur le monde et les miroirs de l'âme. En les lisant, nous nous enrichissons de connaissances, nous explorons des univers inconnus et nous découvrons les multiples facettes de la condition humaine.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Sur cette plateforme, nous te permettrons de venir emprunter des livres en illimité, ainsi que de venir en déposer pour les mettres à disposition des autres étudiants.
                    </p>
                    <div className="flex justify-center space-x-4 mt-10">
                        <NavLink to="/login">
                            <button className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Se Connecter</button>
                        </NavLink>
                        <NavLink to="/register">
                            <button className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">S'inscrire</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}