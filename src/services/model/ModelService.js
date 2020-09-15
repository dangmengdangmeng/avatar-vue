import axios from "axios"

class ModelService {
    static getModel(url, options = {}) {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method: 'post',
                data: options
            }).then(res => {
                resolve(res.headers.location)
            }).catch(error => {
                reject(error)
                console.error(error)
            })
        })
    }
}

export default ModelService
