import { Link } from 'react-router-dom';
import axios from '../lib/axios';
import { useEffect, useState } from 'react';
import './blogs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowUpFromBracket, faCarBurst, faClock, faDotCircle, faHeart,faShareNodes, faUpLong } from '@fortawesome/free-solid-svg-icons';
import LoaderIcon from '../utils/loader';

const BlogPage = () => {
  const [isBlogFetched, setIsBlogsFetched] = useState(false)

  const [data, setData] = useState([])
  
    const fetchData = async () => {
      try {
        const {data, status} = await axios.get("/api/v1/blog")     
        if( status == 200) {
          setIsBlogsFetched(true)
          setData(data?.data) 
        }
      } catch (error) {
          console.error(error)
      }
    }

    useEffect(() => {
      fetchData()
    }, [isBlogFetched])
    
    return (
      <div className='card border-0 d-flex align-items-center mb-5 bg-light'>
       <div className='shadow border-0 main-container w-100'>
          <div className='row'>
          <div className='bg-light p-1 text-white shadow'>
            <h5 className='d-flex align-items-center justify-content-center text-danger p-1'>
               <FontAwesomeIcon icon={faDotCircle} size='sm'   />
               <span className='m-2 fw-bold'>Live updates</span>
            </h5>
          </div>
          <div className='p-1 border-0 shadow-sm blog-main-header w-100 shadow'>
            <div className='d-flex align-items-center fw-bold text-white m-1 w-100 '>
              <FontAwesomeIcon icon={faArrowTrendUp} size='lg' className='m-2'/>
              <h6 className='text-light fw-bold'>Trending now</h6>          
            </div>
          </div>
          {isBlogFetched ? 
             <>
             {data.map((d,i) => {
               const {image_url, title, ID, CreatedAt } = d
               const time = new Date(CreatedAt)
               return (
                     <div key={i} className='border-0 shadow rounded-1 p-3 m-1 mb-3 col col-lg blog_body_container'>
                   
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
                       
                         <div className='d-flex justify-content-between align-items-center text-secondary mt-3 p-2 pt-0 pb-0 category_date'>
                         <div>
                           <small className='btn btn-outline-danger rounded-5 btn-sm'>News</small>
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
                             <button className='btn text-dark btn-sm'>
                               <FontAwesomeIcon icon={faHeart} size='lg'/>
                             </button>
                             <button className='btn text-dark btn-sm'>
                               <FontAwesomeIcon icon={faShareNodes} size='lg'/>
                             </button>
                           </div>
                         </div>
                     </div>
                   </div>
                   )
             }
             )}
           </> :
           <LoaderIcon/>
           }
          </div>
          <div className='d-flex justify-content-center mb-3'>
            <button className='btn btn-primary btn-sm m-1' disabled>Previous</button>
            <button className='btn btn-primary btn-sm m-1'>1</button>
            <button className='btn btn-primary btn-sm m-1' disabled>Next</button>
          </div>
        </div>
      </div>
    )
  }

  export default BlogPage