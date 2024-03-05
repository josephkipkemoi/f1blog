import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './article.css'
import CommentComponent from "./comment"
import axios from "../lib/axios"

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
            const {data, status} = await axios.get(`/api/v1/blogs/${articleId}`)
            if (status == 200) {
                setArticle(data?.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const ArticlePost = () => {
        const markup = { __html: body };
        return <div dangerouslySetInnerHTML={markup} />;
    }
    
    useEffect(() => {
        fetchArticleById()
    }, [articleId])

    return (
        <div className="card p-2 mx-auto article_container mt-3 mb-3 shadow border-0">
            <div className="card card-body border-0">
                <div className="article_img">
                    <img className="img-fluid" src={image_url} alt={image_url}/>
                </div>
                <div className="article_body">
                    <div className="text-secondary mt-2 mb-2">
                        <small >Author: {author ?? "anonymous"}</small>
                    </div>
                    <ArticlePost/>
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