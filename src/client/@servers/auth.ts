import axios from 'axios'

export function login(user){
    return axios.post('/auth/token', user)
}