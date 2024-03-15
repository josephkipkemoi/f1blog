import { Link } from 'react-router-dom'
import './footer.css'

const FooterComponent = () => {
  const time = new Date().getFullYear()
  const categories = localStorage.getItem("categories")
  const ct = JSON.parse(categories)

  return (
      <footer className='bg-dark text-dark fw-bold text-center'>
        <div className='container'>
          <div className='row '>
              <div className='col d-flex flex-column align-items-start'>
                <h6 className='text-white fw-bold'>HIGHLIGHTED LINKS</h6>
                <div className='d-flex flex-column align-items-start'>
                  {ct.map((c,i) => {
                    return (
                      <Link className='text-light'>{c.categoryName}</Link>
                    )
                  })}
                  <Link className='text-light' to="/tips">Tips</Link>
                </div>               
              </div>
              <div className='col d-flex flex-column align-items-start'>
                <h6 className='text-white fw-bold'>ABOUT US</h6>
                <Link className='text-light' to="/about-us">About SportsTidings</Link>
              </div>
              <div className='col d-flex flex-column align-items-start'>
                <h6 className='text-white fw-bold'>CONTACT US</h6>
                <Link className='text-light' to="/contact-us">Contact SportsTidings</Link>
              </div>
              <div className='col d-flex flex-column align-items-start'>
                <h6 className='text-white fw-bold'>LEGAL INFORMATION</h6>
                <Link className='text-light' to="/privacy-policy">Privacy Policy</Link>
                <Link className='text-light' to="/terms-of-use">Terms of use</Link>
                <Link className='text-light' to="/disclaimer">Disclaimer</Link>
              </div>
          </div>
          <hr/>
          <div className='d-flex align-items-center justify-content-center text-secondary p-2'>
           <small >Copyright {time}  </small>  &copy; <small>www.sportstidings.com - cynkem ltd | All rights reserved</small> 
          </div>
        </div>
      </footer>
    )
}

export default FooterComponent
