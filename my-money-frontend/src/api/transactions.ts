import {api} from './api';


export const transactionsAPI = {
  getTransactionsList:
    async (token: string) => await api.get("transactions/", {headers: { Authorization: `Token ${token}`}}),
};
