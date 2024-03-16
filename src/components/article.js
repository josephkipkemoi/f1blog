import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import './article.css'
import CommentComponent from "./comment"
import axios from "../lib/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import LoaderIcon from '../utils/loader'

const ArticleComponent = ({ articleId }) => {
    const [articleLoaded, setArticleLoaded] = useState(false)
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
                setArticleLoaded(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const ArticlePost = () => {
        const markup = { __html: body };
        return <div dangerouslySetInnerHTML={markup} />;
    }

    const handlePrevClick = () => {
        let id = Number(articleId) - 1
        window.location.href = "/articles/" + id
    }
    
    const handleNextClick = () => {
        let id = Number(articleId) + 1
        window.location.href = "/articles/" + id
    }

    useEffect(() => {
        fetchArticleById()
    }, [articleId, articleLoaded])

    return (
        <div className="card p-2 mx-auto article_container mt-3 mb-3 shadow border-0">
           {articleLoaded ?
            <div className="card card-body border-0">
            <div>
                <h3>{title}</h3>
                <hr/>
            </div>
            <div className="article_img d-flex justify-content-center p-2">
                <img className="img-fluid rounded-3" src={image_url} alt={"F1 photo"}/>
            </div>
            <div className="article_body">
                <button className="side_btn_1 btn btn-dark" onClick={handlePrevClick}>
                    <FontAwesomeIcon icon={faArrowLeft} size="xl"/>
                </button>
                <div className="text-secondary mt-2 mb-2">
                    <small >Author: {author ?? "anonymous"}</small>
                </div>
                <button className="side_btn btn btn-dark" onClick={handleNextClick}>
                    <FontAwesomeIcon icon={faArrowRight} size="xl"/>
                </button>
                <ArticlePost/>
                <small className="mr-5">
                    <Link to="/" className="nav-link text-primary">Back to home</Link>
                </small>
                <CommentComponent articleId={articleId}/>
            </div>
        </div> :
        <LoaderIcon/>}
        <script>
        <script type="text/javascript" src="https://vdbaa.com/pup.php?section=General&pt=2&pub=543835&ga=g"></script>
        <script type="text/javascript" src="https://udbaa.com/slider.php?section=General&pub=543835&ga=g&side=random"></script>
        <script type="text/javascript" src="https://vdbaa.com/mobile_redir.php?section=General&pub=543835&ga=g"></script>
        <script type="text/javascript" src="https://udbaa.com/bnr.php?section=General&pub=543835&format=300x250&ga=g"></script>
        <noscript><a href="https://yllix.com/publishers/543835" target="_blank"><img src="//ylx-aff.advertica-cdn.com/pub/300x250.png" style="border:none;margin:0;padding:0;vertical-align:baseline;" alt="ylliX - Online Advertising Network" /></a></noscript>
      </script>
        </div>
    )
}

export default ArticleComponent