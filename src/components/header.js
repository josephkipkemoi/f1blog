import { Link } from "react-router-dom"
import "./header.css"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faMessage, faUser } from "@fortawesome/free-solid-svg-icons"

const HeaderComponent = () => {
    const [user,] = useLocalStorage("user", null)

    return (
      <div className='p-3 bg-dark main-header-body'>
        <div className='main-header d-flex justify-content-between align-items-center'>
          <Link className="nav-link" to="/">
            <h1 className='fw-bold'>F1 SECRETS</h1>
          </Link>
          {user ? <AuthenticatedLinks/> : <UnauthenticatedLinks/>}
        </div>
        <hr/>
        <div className='d-flex'>
          <Link to='/' className='nav-link text-white btn m-1'>Home</Link>
          <Link to='/contact-us' className='nav-link text-white btn m-1'>Contact Us</Link>
        </div>
      </div>
    )
}

const AuthenticatedLinks = () => {
  return (
    <div className="d-flex">
      <div className="m-1">
        <Link className="btn text-light" to={"/messages"}>
          <FontAwesomeIcon icon={faMessage}/>
        </Link>
        <Link className="btn text-light" to={"/notifications"}>
          <FontAwesomeIcon icon={faBell}/>
        </Link>
        <Link className="btn text-light" to={"/profile"}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
   
      <div className="m-1">
        <button className="btn btn-warning">Logout</button>
      </div>
    </div>
  )
}

const UnauthenticatedLinks = () => {
  return (
    <div className='d-sm-flex'>
      <Link to="/register" className='btn btn-sm text-light nav-link rounded-4 fw-bold m-2'>Register</Link>
      <Link to="/login" className='btn btn-sm text-warning nav-link m-2' >Log In</Link>
    </div>
  )
}

export default HeaderComponent