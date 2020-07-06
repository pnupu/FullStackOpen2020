import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(responce => responce.data)
}

const create = newName => {
    const request = axios.post(baseurl, newName)
    return request.then(responce => responce.data)
}

const remove = id =>{
    return axios.delete(`${baseurl}/${id}`)
}

const update = (id, newName) => {
    return axios.put(`${baseurl}/${id}`, newName)
}
export default {getAll, create, remove, update}