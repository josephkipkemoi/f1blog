import { useEffect, useState } from "react"
import { Link, Navigate, redirect } from "react-router-dom"
import axios from '../lib/axios'
import { useLocalStorage } from "../hooks/useLocalStorage"

const RegisterComponent = () => {
    const [user,] = useLocalStorage("user", null)

    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false
    })
    
    if(user) {
        return <Navigate to={"/"}/>
    }

    const { firstName, lastName, email, password, confirmPassword } = details
  
    const onchange = e => setDetails({...details, [e.target.name]: e.target.value})

    const handleCheck = e => setDetails({...details, [e.target.name]: e.target.checked})
    
    const onsubmit = async () => {
        try { 
            const {data: { token, user }, status} = await axios.post("/api/v1/auth/user/register", details)
            if (status == 201) {
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                window.location.href = "/"
            }
        } catch (error) {
            console.error(error)
        }
    }

 
    return (
        <div className="card mb-5">
            <div className="card card-header m-2 bg-light border-0">
                <h4 className="text-dark">Join F1SECRETS</h4>
            </div>
            <div className="card card-body">
                <div className="alert alert-info rounded-0 p-2">
                    <small>All fields marked with asterix ( * ) MUST be filled</small>
                </div>
                <div>
                    <label htmlFor="first_name">First name *:</label>
                    <input 
                        type="text" 
                        id="first_name" 
                        className="form-control mt-2 mb-2 p-3" 
                        placeholder="First name"
                        name="firstName"
                        value={firstName}
                        onChange={onchange}
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last name *:</label>
                    <input 
                        type="text" 
                        id="last_name" 
                        className="form-control mt-2 mb-2 p-3" 
                        placeholder="Last name"
                        name="lastName"
                        value={lastName}
                        onChange={onchange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email *:</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-control mt-2 mb-2 p-3" 
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onchange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password *:</label>
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
                    <label htmlFor="confirm_password">Confirm password *:</label>
                    <input 
                        type="password" 
                        id="confirm_password" 
                        className="form-control mb-2 mt-2 p-3" 
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onchange}
                    />
                </div>
                <div >
                    <input 
                        type="checkbox" 
                        id="checkbox" 
                        name="rememberMe"
                        onChange={handleCheck}
                    />
                    <label htmlFor="checkbox" className="m-1">I accept the Terms and Conditions</label>
                </div>
                <div className="mt-2 mb-2">
                <span className="d-flex justify-content-end">
                    Already Registered?
                    <Link className="nav-link text-primary" to="/login">Login Here</Link>
                 </span>
                    <button 
                        className="btn btn-primary w-50" 
                        onClick={onsubmit}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent