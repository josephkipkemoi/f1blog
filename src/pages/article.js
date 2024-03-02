import { useParams } from "react-router-dom"
import ArticleComponent from "../components/article"
import FooterComponent from "../components/footer"
import HeaderComponent from "../components/header"

const ArticlePage = () => {
    const articleId = useParams("article_id")
    
    return (
        <>
            <HeaderComponent/>
            <ArticleComponent articleId={articleId.article_id}/>
            <FooterComponent/>
        </>
    )
}

export default ArticlePage