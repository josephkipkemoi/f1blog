import { Link, Navigate } from "react-router-dom"
import "./header.css"
import Logo from '../logo.png'
import { useLocalStorage } from "../hooks/useLocalStorage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faDollarSign, faHome, faMailBulk, faMessage, faMoneyBillTrendUp, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import axios from "../lib/axios"


const HeaderComponent = () => {
    const [user,] = useLocalStorage("user", null)

    return (
      <nav className='p-3 main-header-body w-100'>
        <div className='main-header d-flex justify-content-between align-items-center'>
          <Link className="nav-link" to="/">
            <h1 className='fw-bold'>
              <img src={Logo} alt="logo"/>
            </h1>
          </Link>
          {user ? <AuthenticatedLinks/> : <UnauthenticatedLinks/>}
        </div>
        <hr/>
        <div >
          <NavigationLinks/>
        {/* <div>
          <Link to='/donate' className='nav-link text-warning btn m-1 fw-bold'>
            <FontAwesomeIcon icon={faDollarSign} />
            <span className="m-1">Donate</span>
          </Link>
        </div> */}
        </div>
      </nav>
    )
}

const NavigationLinks = () => {
  const [links, setLinks] = useState([])

  const fetchLinks = async () => {
    try {
        const { data: data } = await axios.get("api/v1/category")
        setLinks(data)
    } catch (error) {
        console.error(error)
    }
  }


  useEffect(() => {
    fetchLinks()
  }, [links.length])
  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-none">
  <Link className="nav-link text-light" to="/">Home</Link>
  <button className="navbar-toggler text-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      {links?.data?.map(l => {
      return (
        <li className="nav-item">
          <Link 
            className="nav-link text-white" 
            key={l.CreatedAt}
            to={`/sports?c_name=${l.categoryName}`}
          >
            {l.categoryName}
            <span class="sr-only">(current)</span>
          </Link>
        </li>
      )
    } )}
      <li className="nav-item active">
        <Link className="nav-link text-light" to="/contact-us">Contact<span class="sr-only">(current)</span></Link>
      </li>
     <li className="nav-item active">
        <Link className="nav-link text-warning fw-bold" to="/donate">Donate<span class="sr-only">(current)</span></Link>
      </li>
    </ul>
  </div>

</nav>
  
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