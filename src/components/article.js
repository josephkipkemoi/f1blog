import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import './article.css'
import CommentComponent from "./comment"
import axios from "../lib/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight, faShare } from "@fortawesome/free-solid-svg-icons"
import LoaderIcon from '../utils/loader'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share"

const ArticleComponent = ({ articleId }) => {
    const [articleLoaded, setArticleLoaded] = useState(false)
    const [article, setArticle] = useState({
        title: '',
        body: '',
        image_url :'',
        author: '',
    })

    const { title, body, image_url, author } = article

    const articleUrl = window.location.href
 
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

    const handleShare = () => {

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
                <button className="side_btn btn" onClick={handleNextClick}>
                    <FontAwesomeIcon icon={faArrowRight} size="xl"/>
                </button>
                <ArticlePost/>
              
                <small className="mr-5">
                    <Link to="/" className="nav-link text-primary">Back to home</Link>
                </small>
                <div className="d-sm-flex justify-content-start flex-column mt-4 mb-4">
                <small className="d-block">Share article</small>
                <div>
                <FacebookShareButton  
                url={articleUrl}
                >     
                <button
                    className="btn d-flex align-items-center justify-content-between"
                >
                    <FacebookIcon size={32}></FacebookIcon>
                 </button>
                 </FacebookShareButton> 
                 <TwitterShareButton
                    url={articleUrl}
                 >
                 <button
                    className="btn  d-flex align-items-center justify-content-between"
                >
                    <TwitterIcon size={32}></TwitterIcon>
                 </button>                 
                 </TwitterShareButton>
                 <WhatsappShareButton
                    url={articleUrl}
                 >
                 <button
                    className="btn d-flex align-items-center justify-content-between"
                >
                    <WhatsappIcon size={32}></WhatsappIcon>
                 </button>                  
                </WhatsappShareButton>
                <TelegramShareButton
                    url={articleUrl}
                >    
                 <button
                    className="btn d-flex align-items-center justify-content-between"
                >
                    <TelegramIcon size={32}></TelegramIcon>
                 </button>                  
                </TelegramShareButton>
                <LinkedinShareButton
                    url={articleUrl}
                >
                <button
                    className="btn d-flex align-items-center justify-content-between"
                >
                    <LinkedinIcon size={32}></LinkedinIcon>
                 </button>  
                </LinkedinShareButton>
                </div>                
                </div>              
                <CommentComponent articleId={articleId}/>
            </div>
        </div> :
        <LoaderIcon/>}
        <script type='text/javascript' src='//pl22876204.profitablegatecpm.com/44/69/73/44697334abd9bfffd24e61a6cfc6186b.js'></script>
        </div>
    )
}

export default ArticleComponent