import {api} from './api';

export const loginAPI = {
    createToken:
        async (data:{username:string; password:string;}) => await api.post("api-token-auth/", data)
};