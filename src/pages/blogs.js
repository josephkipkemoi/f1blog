import { Link } from 'react-router-dom';
import axios from '../lib/axios';
import { useEffect, useState } from 'react';
import './blogs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarBurst, faClock, faHeart,faShareNodes } from '@fortawesome/free-solid-svg-icons';

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
      <div className='card border-0 d-flex align-items-center mb-5 bg-light'>
       <div className='container shadow border-0 main-container'>
          <div className='row'>
          <div className=' p-1 border-0 shadow-sm blog-main-header'>
          <h3 className='fw-bold text-white m-2'>
            <FontAwesomeIcon icon={faCarBurst} size='lg'/>
            Trending Now
            </h3>
        </div>
          {data.map((d,i) => {
            const {image_url, title, ID, CreatedAt } = d
            const time = new Date(CreatedAt)
            return (
                  <div key={i} className='border-0 shadow rounded-0 p-3 m-1 mb-2 col col-lg blog_body_container'>
                  <div>
                    <div className='blog_header p-1'>
                      <Link to={`/articles/${ID}`} className='nav-link'>
                        <h6 className='fw-bold'>{title}</h6>
                      </Link>
                    </div>
                    <hr/>
                      <div className='image_body mb-2 mt-2 shadow-sm rounded-4 border-0 p-2 bg-none d-flex align-items-center'>
                          <img className='img-fluid rounded-4' src={image_url} alt='featured'/>
                      </div>
                    
                      <div className='d-flex justify-content-between align-items-center text-secondary p-2 pt-0 pb-0 category_date'>
                      <div>
                        <small className='btn btn-outline-warning rounded-5 btn-sm'>News</small>
                      </div>
                      <div className='d-flex align-items-center'>
                        <FontAwesomeIcon 
                          icon={faClock} 
                          size='sm' 
                          className='m-1'
                        /> 
                        <span className='text-secondary'>  
                          {time.getDay() + " | " + time.getMonth()}
                        </span>
                      </div>
                      </div>
                      <hr/>
                      <div className='d-flex justify-content-between mt-3'>
                        <div>
                          <Link to={`/articles/${ID}`} className='btn text-primary btn-sm fw-bold'>Read More...</Link>
                        </div>
                        <div>
                        {/* <button className='btn btn-sm'>E</button>
                        <button className='btn btn-sm'>D</button> */}
                          <button className='btn text-secondary btn-sm'>
                            <FontAwesomeIcon icon={faHeart} size='lg'/>
                          </button>
                          <button className='btn text-warning btn-sm'>
                            <FontAwesomeIcon icon={faShareNodes} size='lg'/>
                          </button>
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