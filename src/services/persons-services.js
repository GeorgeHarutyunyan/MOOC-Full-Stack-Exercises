import axios from 'axios'

const baseURL = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(
        response => {
            console.log('persons:',response.data)
            return response.data
        })
}

const createPerson = personObject => {
    const request = axios.post(`${baseURL}`,personObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id,newObject) => {
    const request = axios.put(`${baseURL}/${id}`,newObject)
    return request.then(response => response.data)
}

export default {getAll,createPerson,deletePerson,updatePerson}

