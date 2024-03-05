import { Link, Navigate } from "react-router-dom"
import "./header.css"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faContactCard, faDollarSign, faHome, faMailBulk, faMessage, faMoneyBill, faMoneyBillTrendUp, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"

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
        <div className='d-flex justify-content-between'>
          <div className="d-flex">
            <Link to='/' className='nav-link text-white btn m-1'>
              <FontAwesomeIcon icon={faHome} />
              <span className="m-1">Home</span>
            </Link>
            <Link to='/tips' className='nav-link text-white btn m-1'>
              <FontAwesomeIcon icon={faMoneyBillTrendUp} />
              <span className="m-1">Tips</span>  
            </Link>
            <Link to='/contact-us' className='nav-link text-white btn m-1'>
              <FontAwesomeIcon icon={faMailBulk} />
              <span className="m-1">Contact Us</span>  
            </Link>
          </div>
        <div>
          <Link to='/donate' className='nav-link text-white btn m-1 fw-bold'>
            <FontAwesomeIcon icon={faDollarSign} />
            <span className="m-1">Donate</span>
          </Link>
        </div>
        </div>
      </div>
    )
}

const AuthenticatedLinks = () => {
  const [_, setUser] = useLocalStorage("user")
  
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    window.location.href = "/"
  }

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
        <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
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