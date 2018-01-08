import { Api } from '@servers';

export function fetchSearchUsers(q){
    return Api.get(`https://api.github.com/search/users?q=${q}`)
}