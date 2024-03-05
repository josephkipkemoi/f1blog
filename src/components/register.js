import { useState } from "react"
import { Link, Navigate, redirect } from "react-router-dom"
import axios from '../lib/axios'
import { useLocalStorage } from "../hooks/useLocalStorage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import ErrorComponent from './error'

const RegisterComponent = () => {
    const [userLoading, setUserLoading] = useState(false)
    const [errors, setErrors] = useState([])

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
    
    const emptyErrors = () => setErrors([])

    const onsubmit = async () => {
        setUserLoading(true)
        try { 
            const {data: { token, user }, status} = await axios.post("/api/v1/auth/user/register", details)
            if (status == 201) {
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                window.location.href = "/"
                setUserLoading(false)
            }
        } catch (error) {
            setUserLoading(false)
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

                {errors.length > 0 && <ErrorComponent error={errors} setError={emptyErrors}/>}
                    
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
                    <label htmlFor="checkbox" className="m-1">
                        <small>
                            By clicking Register you accept the Terms and Conditions herein
                        </small>
                    </label>
                </div>
                <div className="mt-2 mb-2">
                <span className="d-flex justify-content-end">
                   <span className="m-1">Already Registered?</span> 
                    <Link className="nav-link text-primary m-1" to="/login">Login Here</Link>
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
                    className="btn btn-primary fw-bold" 
                    onClick={onsubmit}
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span className="m-1">Register</span>
                    </button>
                    }
                 
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent