import {api} from './api';


export const transactionsAPI = {
  getTransactionsList:
    async (token: string, page = 1, page_size = 10) => await api.get(
      `transactions/?page=${page}&page_size=${page_size}`,
      {headers: {Authorization: `Token ${token}`}}),

  createTransaction:
    async (token: string, transactionData: {date: string; description: string;
        value: number | string}) => await api.post(`transactions/`,
      transactionData, {headers: {Authorization: `Token ${token}`}}),

  editTransaction:
    async (token: string, id: number, transactionData: {date: string;
        description: string; value: number | string}) => await api.put(
      `transactions/${id}/`, transactionData,
      {headers: {Authorization: `Token ${token}`}}),

  deleteTransaction:
    async (token: string, id: number) => await api.delete(
      `transactions/${id}/`, {headers: {Authorization: `Token ${token}`}}),
};
