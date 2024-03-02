import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './article.css'
import CommentComponent from "./comment"

const ArticleComponent = ({ articleId }) => {
    const [article, setArticle] = useState({
        title: '',
        body: '',
        image_url :'',
        author: '',
    })

    const { title, body, image_url, author } = article

    const fetchArticleById = async () => {
        try {
            const {data, status} = await axios.get(`http://127.0.0.1:5050/api/v1/blogs/${articleId}`)
            if (status == 200) {
                setArticle(data?.data)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        fetchArticleById()
    }, [articleId])

    return (
        <div className="card p-2 mx-auto article_container mt-3 mb-3 shadow border-0">
            <div className="card card-header border-0 bg-white">
                <h4>{title}</h4>
            </div>
            <div className="card card-body border-0">
                <div className="article_img">
                    <img className="img-fluid" src={image_url} alt={image_url}/>
                </div>
                <div className="article_body">
                    <div className="text-secondary mt-2 mb-2">
                        <small >Author: {author}</small>
                    </div>
                    <p>{body}</p>
                    <small>
                        <Link to="/" className="nav-link text-primary">Back to home</Link>
                    </small>
                    <CommentComponent articleId={articleId}/>
                </div>
            
            </div>
    
        </div>
    )
}

export default ArticleComponent