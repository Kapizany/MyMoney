import { Transaction } from "./transaction";


export interface TransactionsTableProps {
  data: {
    count: number;
    page: number;
    results: Transaction[];
  };
  deleteTransaction: Function;
  setLoadingToTrue: Function;
  updateTableData: Function;
  setLastPageOnNewTransaction: Function;
};
