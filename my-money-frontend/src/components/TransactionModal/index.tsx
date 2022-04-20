import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Select,
  Stack,
} from "@chakra-ui/react";
import { transactionsAPI } from "../../api/transactions";
import { TransactionModalProps } from "../../interfaces/transactionModal";
import { Input } from "../Input";


export function TransactionModal({
    newTransaction,
    transactionId,
    transactionCategory,
    setTransactionCategory,
    transactionDate,
    setTransactionDate,
    transactionDescription,
    setTransactionDescription,
    transactionValue,
    setTransactionValue,
    resetModalInputs,
    setLoadingToTrue,
    updateTableData,
    setLastPageOnNewTransaction,
    isOpen,
    onClose,
  }: TransactionModalProps & ModalProps) {
  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onEsc={() => {resetModalInputs()}}
        onOverlayClick={() => {resetModalInputs()}}
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.50">
          <ModalHeader color="dollar.900">
            {newTransaction ? "Add transaction" : "Edit transaction"}
          </ModalHeader>
          <ModalCloseButton
            bgColor="#d0312d"
            color="gray.50"
            _hover={{bgColor: "#ff0000"}}
            _focus={{outline: "none"}}
            onClick={() => {resetModalInputs()}}
          />
          <ModalBody>
            <Stack>
              <Input
                name="date"
                type="date"
                placeholder="Date"
                value={transactionDate}
                onChange={(event) => {
                  setTransactionDate(event.target.value);
                }}
              />
              <Select
                name="category"
                placeholder="Category"
                variant="flushed"
                size="lg"
                borderColor="dollar.500"
                focusBorderColor="dollar.500"
                color="dollar.900"
                value={transactionCategory}
                onChange={(event) => {
                  setTransactionCategory(event.target.value);
                }}
              >
                <option value="market">Market</option>
                <option value="transportation">Transportation</option>
                <option value="clothing">Clothing</option>
                <option value="bills">Bills</option>
                <option value="health_expenses">Health expenses</option>
                <option value="savings">Savings</option>
                <option value="other">Other</option>
              </Select>
              <Input
                name="description"
                type="text"
                placeholder="Description"
                value={transactionDescription}
                onChange={(event) => {
                  setTransactionDescription(event.target.value);
                }}
              />
              <Input
                name="value"
                type="text"
                placeholder="Value"
                value={transactionValue}
                onChange={(event) => {
                  setTransactionValue(
                    event.target.value.replace(/[^0-9.,-]/g, ''));
                }}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor="dollar.500"
              color="gray.50"
              _hover={{bgColor: "dollar.600"}}
              _focus={{outline: "none"}}
              onClick={async () => {
                if (newTransaction) {
                  await transactionsAPI.createTransaction(
                    tokenLocalStorage ? tokenLocalStorage : "",
                    {
                      category: transactionCategory,
                      date: transactionDate,
                      description: transactionDescription,
                      value: transactionValue,
                    },
                  );
                  setLastPageOnNewTransaction();
                }
                else {
                  await transactionsAPI.editTransaction(
                    tokenLocalStorage ? tokenLocalStorage : "",
                    transactionId,
                    {
                      category: transactionCategory,
                      date: transactionDate,
                      description: transactionDescription,
                      value: transactionValue,
                    },
                  );
                }
                onClose();
                resetModalInputs();
                setLoadingToTrue();
                updateTableData();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
