import { useState } from "react"

const ContactComponent = () => {
    const [details, setDetails] = useState({
      first_name: '',
      last_name: '',
      email: '',
      message: ''
    })
  
    const onchange = e => setDetails({...details, [e.target.name]: e.target.value})
  
    const onsubmit = () => {
      console.log(details)
    }
    return (
      <div className='card p-2 shadow'>
        <div className='card card-header border-0'>
            <h4 className='fw-bold text-dark'>Contact Us</h4>
        </div>
        <div className='card card-body'>
          <div className='mb-2'>
            <label className='mb-2'>First Name:</label>
            <input 
              className='form-control p-3' 
              placeholder='First name'
              name='first_name'
              type='text'
              onChange={onchange}
            />
          </div>
          <div className='mb-2'>
            <label className='mb-2'>Last Name:</label>
            <input 
              className='form-control p-3' 
              placeholder='Last name'
              name='last_name'
              type='text'
              onChange={onchange}
            />
          </div>
          <div className='mb-2'>
            <label className='mb-2'>Email:</label>
            <input 
              className='form-control p-3' 
              placeholder='Email'
              name='email'
              type='email'
              onChange={onchange}
            />
          </div>
          <div className='mb-2'>
            <label className='mb-2'>Message:</label>
            <textarea 
              className='form-control p-3' 
              placeholder='Write message here...'
              name='message'
              onChange={onchange}
            />
          </div>
          <div className='mt-2 text-center'>
            <button 
            className='btn btn-primary p-2 shadow-sm '
            onClick={onsubmit}
            >
              Submit Message
            </button>
          </div>
        </div>
        <div className='card card-footer bg-light text-dark p-3'>
          <h5>Get in touch</h5>
          <div className='d-flex justify-content-around'>
            <button className='btn btn-primary'>Facebook</button>
            <button className='btn btn-primary'>Twitter</button>
            <button className='btn btn-primary'>Telegram</button>
            <button className='btn btn-primary'>Whatsapp</button>
          </div>
        </div>
      </div>
    )
  }

  export default ContactComponent