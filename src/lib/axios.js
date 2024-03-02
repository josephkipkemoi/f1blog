import Axios from "axios";

const axios = Axios.create({
    baseURL: `${ (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 
              "http://127.0.0.1:5050/": 
              "http://backend.url/"}`
})

export default axios
