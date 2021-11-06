
import axios from 'axios';

const requester = url =>  {
    return axios.get(url)
}

export default requester;