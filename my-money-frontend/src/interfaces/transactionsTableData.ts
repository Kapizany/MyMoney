import { Transaction } from "./transactions";


export interface TransactionsTableData {
  data: Transaction[];
  loading: boolean;
};
