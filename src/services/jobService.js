import axios from 'axios';

let add = techCompany => {
    const config = {
        method: 'POST',
        url: 'https://api.remotebootcamp.dev/api/techcompanies',
        data: techCompany,
        withCredentials: true,
        crossdomaim: true,
        headers: { 'Content-Type': 'application/json' }
    }
    return axios(config)
}

export { add }
