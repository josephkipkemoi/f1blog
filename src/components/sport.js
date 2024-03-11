import { useLoaderData, useLocation, useParams, useSearchParams } from "react-router-dom"

const SportComponent = () => {
    const location = useLocation()
    const urlParams = new URLSearchParams(location.search)
    const c_name = urlParams.get('c_name')

    return (
        <div className="container">
            <div className="card shadow mt-2">
                <div className="card p-3 card-header border-0 bg-light  border-0">
                    <h6 className="text-dark fw-bold">{c_name}</h6>
                    <hr/>
                </div>
                <div className="card card-body border-0">
                    <p className="text-secondary">No Content</p>
                </div>
            </div>
        </div>
    )
}

export default SportComponent