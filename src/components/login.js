import { Link } from "react-router-dom"

const LoginComponent = () => {
    return (
        <div className="card mb-5">
            <div className="card card-header m-2 bg-light border-0">
                <h4 className="text-dark">Login</h4>
            </div>
            <div className="card card-body">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" className="form-control mt-2 mb-2 p-3" placeholder="Email"/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="form-control mb-2 mt-2 p-3" placeholder="Password"/>
                </div>
                <div >
                    <input type="checkbox" id="checkbox"/>
                    <label htmlFor="checkbox" className="m-1">Remember Me</label>
                </div>
                <div className="mt-2 mb-2">
                <span className="d-flex justify-content-end">
                    Not yet registered?
                    <Link className="nav-link text-primary" to="/login">Register Here</Link>
                 </span>
                    <button className="btn btn-primary w-50">Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent