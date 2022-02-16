import { Transaction } from "./transactions";


export interface TransactionsTableProps {
  data: {
    count: number;
    page: number;
    results: Transaction[];
  };
  deleteTransaction: Function;
}
