import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    const { logoutUser } = useContext(AuthContext)

    return (
        <header className="bg-white shadow flex justify-between p-10">
            <NavLink to='/dashboard'>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mon Tableau de bord</h1>
            </NavLink>
            <NavLink onClick={logoutUser}>
                Se déconnecter
            </NavLink>
        </header>
    );
};

export default Navbar;