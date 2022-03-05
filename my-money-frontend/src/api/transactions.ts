import { api } from "./api";


export const transactionsAPI = {
  getTransactionsList: async (token: string, page = 1, page_size = 10) =>
    await api.get(`transactions/?page=${page}&page_size=${page_size}`, {
      headers: { Authorization: `Token ${token}` },
    }),

  getMonthlyValues: async (token: string, year?: string) =>
    await api.get(
      `transactions/get_monthly_values/${year ? `?year=${year}` : ""}`,
      { headers: { Authorization: `Token ${token}` } }
    ),

  getYears: async (token: string) =>
    await api.get(`transactions/get_years/`, {
      headers: { Authorization: `Token ${token}` },
    }),

  getCategories: async (token: string, year?: string) =>
    await api.get(
      `transactions/get_categories/${year ? `?year=${year}` : ""}`,
      { headers: { Authorization: `Token ${token}` } }
    ),

  createTransaction: async (
    token: string,
    transactionData: {
      category: string;
      date: string;
      description: string;
      value: number | string;
    }
  ) =>
    await api.post(`transactions/`, transactionData, {
      headers: { Authorization: `Token ${token}` },
    }),

  editTransaction: async (
    token: string,
    id: number,
    transactionData: {
      category: string;
      date: string;
      description: string;
      value: number | string;
    }
  ) =>
    await api.put(`transactions/${id}/`, transactionData, {
      headers: { Authorization: `Token ${token}` },
    }),

  deleteTransaction: async (token: string, id: number) =>
    await api.delete(`transactions/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    }),
};
