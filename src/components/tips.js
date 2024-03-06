import { Link } from "react-router-dom"

const TipsComponent = () => {
    return (
        <div className="container">
            <div className="card m-3 border-0 shadow">
                <div className="card card-header border-0">
                 <h3>Tips</h3>
                </div>
                <div className="card card-body border-0">
                    <span className="d-flex alert alert-info align-items-center">Coming soon! <Link to="/register" className="text-primary fw-bold btn">Register Now</Link> to get posted</span>
                </div>
            </div>
           
        </div>
    )
}

export default TipsComponent