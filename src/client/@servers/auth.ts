import { Api } from '@servers';

export function login(user){
    return Api.post('/auth/token', user)
}