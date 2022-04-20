import { Transaction } from "./transaction";


export interface TransactionsTableData {
  data: {
    count: number;
    page: number;
    results: Transaction[];
  };
};
