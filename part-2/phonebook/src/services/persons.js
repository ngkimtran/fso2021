/* eslint-disable import/no-anonymous-default-export*/

import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    const response = request.then(response => response.data)
    return response
}

const create = newObject => {
    const request = axios.post(url, newObject)
    const response = request.then(response => response.data)
    return response
}

const update = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    const response = request.then(response => response.data)
    return response
}

const remove = (id) => {
    return axios.delete(`${url}/${id}`)
}

export default { getAll, create, update, remove }