import { useLoaderData, useLocation, useParams, useSearchParams } from "react-router-dom"
import { BlogMainComponent } from "../pages/blogs"

const SportComponent = () => {
    const location = useLocation()
    const urlParams = new URLSearchParams(location.search)
    const c_name = urlParams.get('c_name')
    const c_id = urlParams.get("c_id")
    return (
        <div className="container">
            <BlogMainComponent
                categoryId={c_id}
                categoryName={c_name}
            />
        </div>
    )
}

export default SportComponent