import { useState } from "react"
import axios from "../lib/axios"
import CategorySubComponent from "./admin/subcomponents/category"
import { Link } from "react-router-dom"
import ArticleSubComponent from "./admin/subcomponents/article"

const AdminComponent = () => {
  
    const [activeComponent, setActiveComponent] = useState('')

    return (
        <div className="card container border-0">
            <AdminNavigation setActiveComponent={setActiveComponent}/>
            {activeComponent == "" && <WelcomeMessage/>}
            {activeComponent == "roles" && <RoleComponent/>}
            {activeComponent == "category" && <CategorySubComponent/>}
            {activeComponent == "articles" && <ArticleSubComponent/>} 
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