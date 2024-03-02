import { useState } from "react"

const AdminComponent = () => {
    const [article, setArticle] = useState({
        title: '',
        image_url: '',
        author: '',
        body: ''
    })

    const onchange = e => setArticle({...article, [e.target.name]: e.target.value})

    const onsubmit = () => {
        console.log(article)
    }
    return (
        <div className="card">
            <div className="card card-header">
                <h4>Write new article</h4>
            </div>
            <div className="card card-body">
                <div>
                    <label htmlFor="article_title">Article TItle *:</label>
                    <input placeholder="Enter article title" id="article_title" className="form-control p-3 mt-2 mb-2" name="title" onChange={onchange}/>
                </div>
                <div>
                    <label htmlFor="article_author">Article Author *:</label>
                    <input placeholder="Enter author name" id="article_author" className="form-control p-3 mt-2 mb-2" name="author" onChange={onchange}/>
                </div>
                <div>
                    <label htmlFor="article_image">Image Url *:</label>
                    <input placeholder="Enter image url" id="article_image" className="form-control p-3 mt-2 mb-2" name="image_url" onChange={onchange}/>
                </div>
                <div>
                    <label htmlFor="article_body">Write Article *: <small>Max. 400 words</small></label>
                    <textarea className="form-control mb-2 mt-2" placeholder="Write article here..." name="body" onChange={onchange}/>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={onsubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AdminComponent