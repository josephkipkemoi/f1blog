import Quill from "quill"
import { useEffect, useState } from "react"
import axios from "../../../lib/axios"
import { Button } from "react-bootstrap"

const ArticleSubComponent = () => {
    const [activeComponent, setActiveComponent] = useState('add')

    const handleClick = e => setActiveComponent(e.target.name)

    return (
        <div className="card container">
            <div className="card card-header bg-white border-0 p-3">
                <h4 className="fw-bold">Articles</h4>
            </div>
            <div className="card card-body row m-2 d-flex flex-row">
                <div className="col-3">
                <h6 className="btn fw-bold btn-white text-dark border-white w-100 rounded-0">Actions</h6>
                <hr className="text-dark"/>
                <Button
                   variant="primary" 
                   className="rounded-0 m-1 w-100"
                   name="add"
                   onClick={handleClick}
                >
                    Create article
                </Button>
                <Button
                   variant="primary" 
                   className="rounded-0 m-1 w-100"
                   name="delete"
                   onClick={handleClick}
                >
                    Delete article
                </Button>
                <Button
                   variant="primary" 
                   className="rounded-0 m-1 w-100"
                   name="update"
                   onClick={handleClick}
                >
                    Update article
                </Button>
                <Button
                   variant="primary" 
                   className="rounded-0 m-1 w-100"
                   name="view"
                   onClick={handleClick}
                >
                    View articles
                </Button>
                </div>

                <div className="col-9">
                    {activeComponent == "add" && <NewArticleComponent/>}
                </div>
            </div>
        </div>
    )
}


const NewArticleComponent = () => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        const c = localStorage.getItem("categories")
        setCategories(JSON.parse(c))
    }

    const [articleLoaded, setArticleLoaded] = useState(false)
    const [article, setArticle] = useState({
        title: '',
        image_url: '',
        author: '',
        featured: false,
        categoryId: null
    })
    const [articleBody, setArticleBody] = useState('')

    const onchange = e => setArticle({...article, [e.target.name]: e.target.value})

    const onsubmit = async () => {
        try {
            const { status } = await axios.post("api/v1/blog/new", {
                image_url: article.image_url,
                author: article.author,
                title: article.title,
                body: articleBody,
                categoryId: Number(article.categoryId),
                featured: article.featured
            })
            if(status == 201) {
                setArticleLoaded(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSuccessfulArticle = () => {
        setArticleLoaded(false)
        alert("Article uploaded succesfully!")
    }

    const loadQuil = () => {
        const container = document.getElementById("editor")
        const options = {
            modules: {
                toolbar: true
            },
            placeholder: 'Write article here...',
            theme: 'snow'
        }
        const quil = new Quill(container, options)
        quil.on("text-change", () => {
            setArticleBody(quil.container.firstChild.innerHTML)
        })
    }

    const handleFeatured = e => setArticle({...article, [e.target.name] : e.target.checked})
 
    useEffect(() => {
        loadQuil()
        getCategories()
    }, [window.location.href])
    return (
        <div className="m-2">
            {articleLoaded && handleSuccessfulArticle()}
            <div className="card card-header border-0 bg-white">
                <h5 className="fw-bold border-0 text-dark">Write article below</h5>
            </div>
            <div className="card card-body">
                <div className="mb-3">
                    <label className="mb-2 text-secondary">Title: *</label>
                    <input 
                        type="text" 
                        name="title" 
                        className="form-control p-3 border-info" 
                        placeholder="Enter article title"
                        onChange={onchange}
                    />
                </div>
                <div className="row mb-3">
                    <div className="col col-sm">
                        <label className="mb-2 text-secondary">Author: *</label>
                        <input 
                            className="form-control border-info p-3" 
                            type="text" 
                            name="author" 
                            placeholder="Article author" 
                            onChange={onchange}
                        />
                    </div>
                    <div className="col col-sm">
                        <label className="mb-2 text-secondary">Image URL: *</label>
                        <input 
                            className="form-control border-info p-3" 
                            type="text" 
                            name="image_url" 
                            placeholder="Image url" 
                            onChange={onchange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col col-sm">
                        <label 
                            htmlFor="featured" 
                            className="mb-2 text-secondary"
                        >
                            Featured: * 
                            <small>check box if true</small>
                        </label>
                        <input 
                            id="featured" 
                            className="d-block" 
                            type="checkbox" 
                            name="featured" 
                            onChange={handleFeatured}
                        />
                    </div>
                    <div className="col col-sm">
                        <label
                         className="mb-2 text-secondary"
                        >
                            Article category: *
                        </label>
                        <select className="form-control p-3" onChange={onchange} name="categoryId">
                            {categories.map((c,i) => <option   value={c.ID} key={i} >{c.categoryName}</option>)}
                        </select>
                    </div>
                </div>
               
                <div className="mt-2 mb-4">
                    <label htmlFor="article_body" className="mb-3 fw-bold">Write main article here: *</label>
                    <div id="editor"></div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={onsubmit}>Post Article</button>
                </div>
            </div>
        </div>
    )
}

export default ArticleSubComponent
