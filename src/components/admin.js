import Quill from "quill"
import { useEffect, useState } from "react"
import axios from "../lib/axios"
import CategorySubComponent from "./admin/subcomponents/category"
import { Link } from "react-router-dom"

const AdminComponent = () => {
  
    const [activeComponent, setActiveComponent] = useState('')

    return (
        <div className="card container border-0">
            <AdminNavigation setActiveComponent={setActiveComponent}/>
            {activeComponent == "" && <WelcomeMessage/>}
            {activeComponent == "roles" && <RoleComponent/>}
            {activeComponent == "category" && <CategoryComponent/>}
            {activeComponent == "articles" && <NewArticleComponent/>} 
        </div>
    )
}

const AdminNavigation = ({ setActiveComponent }) => {
    const handleNavChange = e => setActiveComponent(e.target.name)
    return (
        <nav className="m-2 p-2 d-flex justify-content-start">
            <button 
                className="btn btn-primary rounded-0 m-1"
                onClick={handleNavChange}
                name="roles"
            >
                    Roles
            </button>
            <button 
                className="btn btn-primary rounded-0 m-1"
                onClick={handleNavChange}
                name="category"
            >
                Category
            </button>
            <button
                className="btn btn-primary rounded-0 m-1"
                onClick={handleNavChange}
                name="articles"
            >
                Articles
            </button>
        </nav>
    )
}

const RoleComponent = () => {
    const [role, setRole] = useState({
        roleName: ''
    }) 

    const onchange = e => setRole({...role, [e.target.name]: e.target.value})
    
    const onsubmit = async () => {
        try {
        const { status, data } = await axios.post("/api/v1/roles", role)
        if (status == 201) {
            alert("added")
        } 
        } catch (error) {
            console.error(error)
        }
     
    }
    return (
        <div className="d-flex row flex-row card">
            <div className="col-6">
            <div className="card card-header">
                <h6>Add Role</h6>
            </div>
            <div className="card card-body">
                <input 
                    type="select" 
                    className="form-control border-secondary" 
                    placeholder="enter role"
                    name="roleName"
                    onChange={onchange}
                />
                <div>
                    <button 
                        className="btn btn-primary mt-2"
                        onClick={onsubmit}
                    >
                        Submit
                    </button>
                </div>
                
            </div>
            
            </div>
             <div className="col-6"> 
                <div className="card card-header">
                    <h6>Assign Role</h6>
                </div>
                <div className="card card-body">
                    <input type="text" placeholder="assign role" className="form-control" />
                </div>
                <div className="card card-footer">
                    <button className="btn btn-primary">
                        Submit
                    </button>
                </div>
             
             </div>
        </div>
    )
}

const CategoryComponent = () => {
  
    return (
       <CategorySubComponent/>
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
        <div className="m-2">
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
        </div>
    )
}

const WelcomeMessage = () => {
    return (
        <div className="card border-0">
            <div className="card card-header bg-white border-0">
                <h4 className="fw-bold">
                
                    ADMIN DASHBOARD
                </h4>
                <hr className="text-dark"/>
            </div>
            <div className="card card-body border-0 ">
                <p className="text-secondary">Admin dashboard</p>
                <p>Please click one of the navigation links above to get started</p>
            </div>
            <div className="card card-footer bg-white p-3">
                <p>If you have any questions please leave us a message <Link to="/contact-us">HERE</Link></p>
            </div>
        </div>
    )
}

export default AdminComponent