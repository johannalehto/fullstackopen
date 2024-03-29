import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const deletePerson = (personId) => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

const personService = { getAll, create, update, deletePerson }

export default personService