import { faCheckCircle, faCheckSquare, faExclamationCircle, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import axios from "../../../lib/axios"
import { Button, Modal } from "react-bootstrap"
import './category.css'

const CategorySubComponent = () => {
    const [activeComponent, setActiveComponent] = useState('view')
    const handleClick = e => setActiveComponent(e.target.name)
    return (
        <div className="container mx-auto card m-2 mb-5">
            <div className="card card-header bg-white border-0 p-3">
                <h4 className="fw-bold">Category</h4>
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
                        Add Category
                    </Button>
                    <Button
                     variant="primary" 
                     className="rounded-0 m-1 w-100"
                     name="view"
                     onClick={handleClick}
                    >
                        View Category
                    </Button>
                    <Button
                     variant="primary" 
                     className="rounded-0 m-1 w-100"
                     name="delete"
                     onClick={handleClick}
                     >
                        Delete Category
                    </Button>
                    <Button
                     variant="primary"
                     className="rounded-0 m-1 w-100"
                     name="update"
                     onClick={handleClick}
                    >
                        Update Category
                    </Button>
                </div>
                <div className="col-9">
                    {activeComponent == "add" && <AddCategorySubComponent/>}
                    {activeComponent == "view" && <ViewCategorySubComponent/>}
                    {activeComponent == "delete" && <DeleteCategorySubComponent/>}
                    {activeComponent == "update" && <UpdateCategorySubComponent/>}
                </div>
          
            </div>
        </div>
    )
}

const ViewCategorySubComponent = () => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        const c = localStorage.getItem("categories")
        setCategories(JSON.parse(c))
    }

    useEffect(() => {
        getCategories()
    }, [categories.length])

    return (
        <div className="col-sm-6 category-container">
        <h5 className="fw-bold m-2 text-danger">View categories</h5>
        <hr className="text-dark"/>
            <div className="alert alert-info">
                <span className="d-block">
                    List of all categories added.
                </span>
            </div>           
            <div>
            <label 
                 className="text-secondary mb-3"
                 htmlFor="categories"
             >
                List of category names already available:
            </label>
            <ul>
            {categories.map((c,i) => <li key={i}>{c.categoryName}</li>)}                     
            </ul>
            </div>
        </div>    
    )
}

const AddCategorySubComponent = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const [category, setCategory] = useState({
        categoryName: ''
    }) 

    const onchange = e => setCategory({...category, [e.target.name]: e.target.value})

    const onsubmit = async () => {
        try {
        const { status } = await axios.post("/api/v1/category", category)
        if (status == 201) {
            setOpenModal(false)
            setOpenSuccessModal(true)
        } 
        } catch (error) {
            console.error(error)
            setOpenModal(false)
        }
    }

    const handleOpenModal = () => setOpenModal(true)
    const closeSuccessModal = () => setOpenSuccessModal(false)
    const closeOpenModal = () => setOpenModal(false)

    return (
        <div className="col-sm-6 category-container">
            <h5 className="fw-bold m-2 text-danger">Add category</h5>
            <div className="alert alert-info">
                <span className="d-block">
                    Category names will appear as navigation links and each new blog article will be linked to one category.
                </span>
            </div>
            <label className="text-secondary">Enter category name:</label>
            <input 
                type="text" 
                className="form-control border-info mt-3 mb-3 p-3" 
                placeholder="Type category name here..."
                name="categoryName"
                onChange={onchange}
            />
            <div>
                <button 
                    className="btn btn-primary shadow-sm mt-2 rounded-5s"
                    onClick={handleOpenModal}
                >
                    <FontAwesomeIcon icon={faPlusCircle} size="sm" />
                    <small className="m-1">Add Category</small>
                </button>
            </div>
            <CategoryModal
                openModal={openModal}
                handleSubmit={onsubmit}
                closeOpenModal={closeOpenModal}
            />
            <SuccessModal
                openSuccessModal={openSuccessModal}
                closeSuccessModal={closeSuccessModal}
            />
        </div>
    )
}

const DeleteCategorySubComponent = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const [categories, setCategories] = useState([])
    const [deleteCategory, setDeleteCategiry] = useState({
        categoryId: null
    })

    const { categoryId } = deleteCategory

    const handleSelect = e => setDeleteCategiry({...deleteCategory, [e.target.name]: e.target.value})

    const handleDelete = async () => {
        try {
            const { status } = axios.delete(`api/v1/category/${categoryId}`)
            if (status == 204) {
                setOpenModal(false)
                setOpenSuccessModal(true)
            }
        } catch (error) {
            console.error(error)
            setOpenModal(false)
        }
    }

    const getCategories = () => {
        const c = localStorage.getItem("categories")
        setCategories(JSON.parse(c))
    }

    const handleOpenModal = () => setOpenModal(true)
    const closeSuccessModal = () => setOpenSuccessModal(false)
    const closeOpenModal = () => setOpenModal(false)

    useEffect(() => {
        getCategories()
    }, [categories.length])
    return (
        <div className="col-sm-6 category-container">
        <h5 className="fw-bold m-2 text-danger">Delete/Remove category</h5>
            <div className="alert alert-danger">
                <span className="d-block">
                    This action will remove the category from the database, it may have adverse effects on the layout of your data. Be extremely careful and only delete if you really have to, otherwise it is better to update the category name to your desired wish.
                </span>
            </div>           
            <div>
            <label 
                 className="text-secondary mb-3"
                 htmlFor="categories"
             >
                Select category name:
            </label>
            <select className="form-control p-3  border-info" name="categoryId" id="categories" onChange={handleSelect}>
                {categories.map((c,i) => <option key={i} name="categoryId" value={c.ID}>{c.categoryName}</option>)}                     
            </select>   
            </div>
            <div className="card card-footer border-0">
                <div>
                    <button 
                        className="btn btn-danger mt-2 p-2"
                        onClick={handleOpenModal}
                    >
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                        <small className="m-1">Delete Category</small>
                    </button>
                </div>              
            </div>
            <CategoryModal
                openModal={openModal}
                handleSubmit={handleDelete}
                closeOpenModal={closeOpenModal}
            />
            <SuccessModal
                openSuccessModal={openSuccessModal}
                closeSuccessModal={closeSuccessModal}
            />
        </div>    
    )
}

const UpdateCategorySubComponent = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const [categories, setCategories] = useState([])

    const [updateCategory, setUpdateCategory] = useState({
        categoryName: '',
        categoryId: null
    })

    const { categoryName, categoryId } = updateCategory

    const getCategories = () => {
        const c = localStorage.getItem("categories")
        setCategories(JSON.parse(c))
    }

    const handleSelect = e => setUpdateCategory({...updateCategory, [e.target.name]: e.target.value})

    const handleSubmit= async () => {
        try {
            const { status } = axios.post(`api/v1/categories/${Number(categoryId)}/patch`, {
                categoryName
            })
            if (status == 204) {
                setOpenModal(false)
                setOpenSuccessModal(true)            }
        } catch (error) {
            console.error(error)
            setOpenModal(false)
        }
    }

    const handleOpenModal = () => setOpenModal(true)
    const closeSuccessModal = () => setOpenSuccessModal(false)
    const closeOpenModal = () => setOpenModal(false)

    useEffect(() => {
        getCategories()
    }, [categories.length])

    return (
        <div className="col-sm-6 category-container">
        <h5 className="fw-bold m-2 text-danger">Update category name</h5>
            <div className="alert alert-info">
                <span className="d-block">
                    This action will update the selected category name to a new name of your choice, this action does not have adverse effects on the layout of your data and it's highly recommended to deleting a category.
                </span>
            </div>
            <div className="">
                <div>
                    <label 
                     className="text-secondary mb-3"
                     htmlFor="categories"
                     >
                        Select category name from dropdown below:
                    </label>
                    <select className="form-control p-3  border-info" name="categoryId" id="categories" onChange={handleSelect}>
                        {categories.map((c,i) => <option key={i} name="categoryId" value={c.ID}>{c.categoryName}</option>)}                     
                    </select>             
                </div>
                <div className="mt-2">
                    <label className="text-secondary">Enter new category name:</label>
                    <input 
                        type="text" 
                        className="form-control border-info mt-3 mb-3 p-3" 
                        placeholder="type new category name"
                        name="categoryName"
                        onChange={handleSelect}
                    />
                </div>
            </div>
            <div className="card card-footer border-0">
                <div className="d-flex">
                    <button 
                        className="btn btn-secondary mt-2"
                        onClick={handleOpenModal}
                    >
                        <FontAwesomeIcon icon={faCheckCircle} size="sm"/>
                        <small className="m-1">Update</small>
                    </button>
                </div>           
            </div>
            <CategoryModal
                openModal={openModal}
                handleSubmit={handleSubmit}
                closeOpenModal={closeOpenModal}
            />
            <SuccessModal
                openSuccessModal={openSuccessModal}
                closeSuccessModal={closeSuccessModal}
            />
        </div> 
    )
}

const CategoryModal = ({openModal, handleSubmit, closeOpenModal}) => {
    return (
        <Modal show={openModal} centered>
            <Modal.Header className="bg-danger">
                <h6 className="d-flex align-items-center">   
                    <FontAwesomeIcon icon={faExclamationCircle} size="lg" className="text-white" />
                    <span className="fw-bold  text-white m-2">Confirm Action</span>             
                </h6>
            </Modal.Header>
            <Modal.Body>
                <p className="text-center p-3">Are you sure you want to perform this action?</p>
            </Modal.Body>
            <Modal.Footer className="bg-light">
                <Button
                    variant="secondary"
                    onClick={closeOpenModal}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const SuccessModal = ({ openSuccessModal, closeSuccessModal }) => {
    return (
        <Modal show={openSuccessModal} centered>
            <Modal.Header className="bg-success">
                <h4 className="d-flex align-items-center fw-bold text-white">
                    <h5 className="m-2 fw-bold text-white">Action Completed!</h5>  
                </h4>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex align-items-center justify-content-center p-3">
                    <h4>
                        <FontAwesomeIcon className="text-success" icon={faCheckCircle}  size="xl"/>
                    </h4>
                    <p className="m-2 text-success">Action completed successfully</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button
                    variant="dark"
                    onClick={closeSuccessModal}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default CategorySubComponent