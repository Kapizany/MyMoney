import {api} from './api';


export const transactionsAPI = {
  getTransactionsList:
    async (token: string, page = 1, page_size = 10) => await api.get(
      `transactions/?page=${page}&page_size=${page_size}`, {headers: {Authorization: `Token ${token}`}}),

  deleteTransaction:
    async (token: string, id: number) => await api.delete(
      `transactions/${id}`, {headers: {Authorization: `Token ${token}`}}),
};
