import { Link, Navigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useState } from "react"
import axios from "../lib/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"
import ErrorComponent from "./error"

const LoginComponent = () => {
    const [userLoading, setUserLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const [details, setDetails] = useState({
        email: '',
        password: '',
        rememberMe: false
    })

    const [user,] = useLocalStorage("user", null)

    if(user) {
        return <Navigate to={"/"}/>
    }

    const { email, password } = details

    const onchange = e => setDetails({...details, [e.target.name]: e.target.value})

    const handleCheckbox = e => setDetails({...details, [e.target.name]: e.target.checked})

    const emptyErrors = () => setErrors([])
  
    const handleLogin = async () => {
        setUserLoading(true)
        try {
            const { data: { user, token }, status } = await axios.post("/api/v1/auth/user/login", details)
            if (status == 200) {
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserLoading(false)
                window.location.href = "/"
            }
        } catch ({response: {data: { error }, status}}) {
            setUserLoading(false)
            if (status == 401) {
                setErrors([error])
            }
        }
    }

    return (
        <div className="card mb-5">
            <div className="card card-header m-2 bg-light border-0">
                <h4 className="text-dark">Login</h4>
            </div>
            <div className="card card-body">
                <div>
                    {errors.length > 0 && <ErrorComponent error={errors} setError={emptyErrors}/>}
                    <label htmlFor="email">Email *</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-control mt-2 mb-2 p-3" 
                        placeholder="abc@xyz.com"
                        name="email"
                        value={email}
                        onChange={onchange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password *</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-control mb-2 mt-2 p-3" 
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onchange}
                    />
                </div>
                <div >
                    <input 
                        type="checkbox" 
                        id="checkbox"
                        name="rememberMe"
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="checkbox" className="m-1">Remember Me</label>
                </div>
                <div className="mt-2 mb-2">
                <span className="d-flex justify-content-end">
                    <span className="m-1">Not yet registered?</span>
                    <Link className="nav-link text-primary m-1" to="/register">Register here</Link>
                 </span>
                 {userLoading ?
                   <button 
                        className="btn btn-primary p-2 m-1 fw-bold" 
                        disabled={true}
                    >
                        Loading...
                    </button>
                    :
                    <button 
                        className="btn btn-primary p-2 fw-bold m-1"
                        onClick={handleLogin}
                    >
                        <FontAwesomeIcon icon={faRightToBracket} />
                        <span className="m-1">Sign In</span> 
                    </button>
                    }                  
                </div>
            </div>
        </div>
    )
}

export default LoginComponent