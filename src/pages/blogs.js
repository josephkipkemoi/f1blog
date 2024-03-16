import { Link } from 'react-router-dom';
import axios from '../lib/axios';
import { useEffect, useState } from 'react';
import './blogs.css'
import LoaderIcon from '../utils/loader';

const BlogPage = () => {
    const [categoryFetching, setCategoryFetching] = useState(false)
    const [category, setCategory] = useState([])

    const fetchCategory = async () => {
      setCategoryFetching(true)
      try {
        const { status, data } = await axios.get("api/v1/category")
        if (status == 200) {        
          setCategoryFetching(false)
          setCategory(data.data)
          localStorage.setItem("categories", JSON.stringify(data.data))
        }
      } catch (error) {
        setCategoryFetching(false)
        console.error(error)
      }
    
    }

    useState(() => {
      fetchCategory()
    }, [category])

    return (
      <>
   
      {categoryFetching ? <LoaderIcon/> : <>
          <BlogMainComponent
            classStyle="main-container"
            textStyle={"light"}
            categoryName={"Top Trending"}
            categoryId={6}
          />
          {category.map((c,id) => {
            return (
              <div className='w-100'>
              <BlogMainComponent 
              key={id} 
              textStyle={"dark"} 
              categoryName={c.categoryName} 
              categoryId={c.ID}
              />
              </div>
            )
          })}
        </>}
     
      </>
    
    )
  }

  const BlogMainComponent = ({ classStyle, textStyle, categoryName, categoryId }) => {
    const [isBlogFetched, setIsBlogsFetched] = useState(false)

    const [data, setData] = useState([])
    
      const fetchData = async () => {
        try {
          const {data, status} = await axios.get(`/api/v1/blog?c_id=${categoryId}&featured=${true}`)     
          if( status == 200) {
            setIsBlogsFetched(true)
            setData(data) 
          }
        } catch (error) {
            console.error(error)
        }
      }

      useEffect(() => {
        fetchData()
      }, [isBlogFetched, window.screen.width, categoryId, categoryName])
      
    return (
      <div className={`'container card mt-3 mb-3 border-0 shadow' ${classStyle}`}>
        <div className={`card card-header  border-0 d-flex flex-row bg-${classStyle}`}>
          <div className='d-flex align-items-center fw-bold blog_header_first_child'>
            <h3 className={`text-${textStyle} fw-bold`}>{categoryName}</h3>
          </div>
          <div className={`w-100 line-through-${textStyle}`}>
             <span className='text-white'></span>
           </div>
        
        </div>
           {isBlogFetched ? 
           <BlogComponent 
            data={data}
            textStyle={categoryName != "Top Trending" ? "dark" : "light"}          
           />
           :
          <LoaderIcon/>
          }
     </div>
    )
  }

  const BlogComponent = ({ textStyle, data }) => {
    const [screenSize, ] = useState(window.screen.width)
    const categoryName = data.category

    return (
      <div className={`shadow rounded-4 p-2 mb-3 row ${screenSize <= 760  && "d-flex flex-column "}`}>
        <div className='col-sm-8'>
          {data.featured.map((f,i) => {
            const { image_url, title,ID, CreatedAt } = f
            const timestamp = new Intl.DateTimeFormat('en-US', {month: "2-digit",day: "2-digit", year: "2-digit"}).format(new Date(CreatedAt))
            return (
              <div  key={i} className='col d-flex flex-column'>
              <Link className='nav-link' to={`/articles/${ID}`}>
              <div className='img_holder m-2 d-flex justify-content-center align-items-center'>
                  <img 
                    className='text-secondary img-fluid w-100' 
                    src={image_url} 
                    alt='logo' 
                  />
              </div>
              <div className='headline_holder m-2'>
                <div>
                  <p><small className='text-warning'>{categoryName}</small></p>
                </div>  
                <h4 className={`text-${textStyle} mt-2 fw-bold`}>
                  {title}
                </h4>                   
                <div className='d-flex align-items-center justify-content-between mt-2'>
                  <Link className='nav-link text-warning fw-bold text-underline' to={`/articles/${ID}`}>Full Details <small>&gt;&gt;</small></Link>
                  <small className='text-secondary'>{timestamp}</small>
                </div>
              </div>
              </Link>
              </div>
            )
          })}
        </div>
      
        <div className='col'>
            {data.data.map((d,i) => {
            const { image_url, title,ID, CreatedAt } = d
            const timestamp = new Intl.DateTimeFormat('en-US', {month: "2-digit",day: "2-digit", year: "2-digit"}).format(new Date(CreatedAt))             
            return (
                <div className='d-flex flex-column justify-content-between' key={i}>
                  <Link className='nav-link' to={`/articles/${ID}`}>
                    <div className='headline_holder'>
                      <h6 className={`fw-bold text-${textStyle} mt-2`}>
                        {title}
                      </h6>
                      <div>
                        <p><small className='text-warning'>{categoryName}</small></p>
                      </div>    
                    </div> 
                    <div className='d-flex align-items-center justify-content-center img_holder_child'>
                      <img 
                      className='img-fluid w-100'  
                      src={image_url} alt='featured' />
                    </div>
                    <div className='d-flex align-items-center justify-content-between mt-3'>
                        <Link className='nav-link fw-bold text-warning' to={`/articles/${ID}`}>
                        <small>Read More</small>
                        </Link>
                        <small className='text-secondary'>{timestamp}</small>
                    </div>
                  </Link>
                 
                </div>
              )
            })}
        </div>
 </div>
    )
  }

  export  {BlogPage, BlogMainComponent}