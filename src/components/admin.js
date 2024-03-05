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
        author: '',
        body: ''
    })

    const onchange = e => setArticle({...article, [e.target.name]: e.target.value})

    const onsubmit = async () => {
        try {
            const { status } = await axios.post("api/v1/blog/new", { body: article.body })
            if(status == 201) {
                setArticleLoaded(true)
            }
        } catch (error) {
            console.error(error)
        }
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
            setArticle({...article, body: JSON.stringify(quil.container.firstChild.innerHTML)})
        })
    }

    useEffect(() => {
        loadQuil()
    }, [window.location.href])
    return (
        <>
            <div className="card card-header bg-secondary">
                <h4 className="text-white">Article</h4>
            </div>
            <div className="card card-body">
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