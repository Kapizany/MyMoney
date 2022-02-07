import { Transaction } from "./transactions";


export interface TransactionsTableProps {
  tableData:{
    count: number;
    page: number;
    results: Transaction[];
  };
}
