import { Link } from 'react-router-dom';
import axios from '../lib/axios';
import { useEffect, useState } from 'react';

const BlogPage = () => {
    const [data, setData] = useState([])
  
    const fetchData = async () => {
      try {
        const {data, status} = await axios.get("/api/v1/blog")     
        if( status == 200) {
          setData(data?.data) 
        }
      } catch (error) {
          console.error(error)
      }
    }

    useEffect(() => {
      fetchData()
    }, [])
    
    return (
      <div className='card border-0 d-flex align-items-center mb-5'>
        <div className='card card-header rounded-0 p-2 shadow blog-main-header border-0'>
            <h2 className='fw-bold text-white m-2'>Trending Now</h2>
        </div>
        <hr/>
        <div className='container'>
          <div className='row'>
          {data.map((d,i) => {
            const { body, image_url, title, ID } = d
            return (
                  <div key={i} className='bg-light border-0 shadow rounded-3 p-1 m-2 col-sm blog_body_container'>
                  <div>
                    <div className='blog_header p-1'>
                      <Link to={`/articles/${ID}`} className='nav-link'>
                        <h4 className='fw-bold'>{title}</h4>
                      </Link>
                    </div>
                      <div className='image_body mb-2 mt-2 shadow-sm border-0'>
                          <img className='img-fluid' src={image_url} alt='featured'/>
                      </div>
                      <div className='p-1 blog_body'>
                        <p className='text-secondary'>{body}</p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div>
                          <Link to={`/articles/${ID}`} className='btn text-primary btn-sm fw-bold'>Read More...</Link>
                        </div>
                        <div>
                        {/* <button className='btn btn-sm'>E</button>
                        <button className='btn btn-sm'>D</button> */}
                          <button className='btn text-warning btn-sm'>Share</button>
                        </div>
                      </div>
                  </div>
                </div>
                )
          }
          )}
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary btn-sm m-1' disabled>Previous</button>
            <button className='btn btn-primary btn-sm m-1'>1</button>
            <button className='btn btn-primary btn-sm m-1' disabled>2</button>
            <button className='btn btn-primary btn-sm m-1' disabled>3</button>
            <button className='btn btn-primary btn-sm m-1' disabled>Next</button>
          </div>
        </div>
      </div>
    )
  }

  export default BlogPage