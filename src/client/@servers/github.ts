import axios from 'axios'

export function fetchSearchUsers(q){
    return axios.get(`https://api.github.com/search/users?q=${q}`)
}