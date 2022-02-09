import { Transaction } from "./transactions";


export interface TransactionsTableData {
  data: {
    count: number;
    page: number;
    results: Transaction[];
  };
  loading: boolean;
};
