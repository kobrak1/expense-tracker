import axios from "axios"

const baseUrl = 'http://localhost:3001/notes'

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createNote = async (content) => {   
    const response = await axios.post(baseUrl, content)
    return response.data
}

export const updateNote = async (updatedContent) => {
    const response = await axios.put(`${baseUrl}/${updatedContent.id}`, updatedContent)
    return response.data
}