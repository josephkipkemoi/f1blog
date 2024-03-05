import { Navigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"

export const ProtectedRoute = ({ children }) => {{
    const [user,] = useLocalStorage("user", null)
    if(!user) {
        return <Navigate to={"/login"} />
    }
    return children
}}