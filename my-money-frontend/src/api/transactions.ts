import {api} from './api';


export const transactionsAPI = {
  getTransactionsList:
    async (token: string, page = 1) => await api.get(`transactions/?page=${page}`, {headers: { Authorization: `Token ${token}`}}),
};
