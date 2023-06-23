import axios from 'axios'

export default axios.create({
    baseURL:'http://192.168.68.110:3001', 
    headers: {
        'Content-Type': 'application/json'
    }
})
