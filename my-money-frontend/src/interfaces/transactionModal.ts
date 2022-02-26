export interface TransactionModalProps {
  newTransaction: boolean;
  transactionId: number;
  transactionCategory: string;
  setTransactionCategory: Function;
  transactionDate: string;
  setTransactionDate: Function;
  transactionDescription: string;
  setTransactionDescription: Function;
  transactionValue: number | string;
  setTransactionValue: Function;
  resetModalInputs: Function;
  setLoadingToTrue: Function;
  updateTableData: Function;
  setLastPageOnNewTransaction: Function;
};
