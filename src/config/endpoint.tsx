import axios from 'axios'

export default axios.create({
    baseURL:'http://192.168.68.120:3001', headers: {
        'Content-Type': 'application/json'
    }
})