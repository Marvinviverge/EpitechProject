import { Navigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"


const AuthGuard = ({ children }) => {
    let { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to="/" />
    }
    return children
}

export default AuthGuard