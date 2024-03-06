import Quill from "quill"
import { useEffect, useState } from "react"
import axios from "../lib/axios"

const AdminComponent = () => {
  
    return (
        <div className="card">
            <NewArticleComponent/>
        </div>
    )
}

const NewArticleComponent = () => {
    const [articleLoaded, setArticleLoaded] = useState(false)
    const [article, setArticle] = useState({
        title: '',
        image_url: '',
        author: ''
    })
    const [articleBody, setArticleBody] = useState('')

    const onchange = e => setArticle({...article, [e.target.name]: e.target.value})

    const onsubmit = async () => {
        try {
            const { status } = await axios.post("api/v1/blog/new", {
                image_url: article.image_url,
                author: article.author,
                title: article.title,
                body: articleBody
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

    useEffect(() => {
        loadQuil()
    }, [window.location.href])
    return (
        <>
            {articleLoaded && handleSuccessfulArticle()}
            <div className="card card-header bg-secondary">
                <h4 className="text-white">Article</h4>
            </div>
            <div className="card card-body">
                <div className="mb-3">
                    <label className="mb-2">Title *</label>
                    <input type="text" name="title" className="form-control p-2 border-danger" placeholder="Enter article title" onChange={onchange}/>
                </div>
                <div className="row mb-3">
                    <div className="col col-sm">
                        <label className="mb-2">Author *</label>
                        <input className="form-control" type="text" name="author" placeholder="Article author" onChange={onchange}/>
                    </div>
                    <div className="col col-sm">
                        <label className="mb-2">Image URL *</label>
                        <input className="form-control" type="text" name="image_url" placeholder="Image url" onChange={onchange}/>
                    </div>
                </div>
               
                <div className="mt-2 mb-4">
                    <label htmlFor="article_body" className="mb-3">Write Article *</label>
                    <div id="editor"></div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={onsubmit}>Post Article</button>
                </div>
            </div>
        </>
    )
}

export default AdminComponent