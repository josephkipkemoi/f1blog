import { Link } from "react-router-dom"
import "./header.css"

const HeaderComponent = () => {
    return (
      <div className='p-3 bg-dark main-header-body'>
        <div className='main-header d-flex justify-content-between align-items-center'>
          <Link className="nav-link" to="/">
            <h1 className='fw-bold'>F1 SECRETS</h1>
          </Link>
          <div className='d-sm-flex'>
            <Link to="/register" className='btn btn-sm text-light nav-link rounded-4 fw-bold m-2'>Register</Link>
            <Link to="/login" className='btn btn-sm text-warning nav-link m-2' >Log In</Link>
          </div>
        </div>
        <hr/>
        <div className='d-flex'>
          <Link to='/' className='nav-link text-white btn m-1'>Home</Link>
          <Link to='/contact-us' className='nav-link text-white btn m-1'>Contact Us</Link>
        </div>
      </div>
    )
}

export default HeaderComponent