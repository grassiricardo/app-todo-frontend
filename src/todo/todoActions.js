import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    const request = axios.get(`${URL}?sort=-createdAt`)
    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

export const add = (description) => {
    return dispacth => {
        axios.post(URL, { description })
            .then(resp => dispacth({
                type: 'TODO_ADDED',
                payload: resp.data
            })
            .then(resp => dispacth(search()))
        )
    }
}

export const markAsDone = (todo) => {
    return dispacth => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispacth(search()))
    }
}

export const markAsPending = (todo) => {
    return dispacth => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispacth(search()))
    }
}

export const remove = (todo) => {
    return dispacth => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispacth(search()))
    }
}


