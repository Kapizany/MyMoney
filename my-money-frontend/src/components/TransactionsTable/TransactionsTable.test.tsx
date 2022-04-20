import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TransactionsTable } from ".";
import { Button, IconButton, Input } from "@chakra-ui/react";
import { transactionsAPI } from "../../api/transactions";
import { Transaction } from "../../interfaces/transaction";


configure({ adapter: new Adapter() });


jest.mock("../../api/transactions");


describe("Test TransactionsTable component", () => {

  const initialTransactionTableData = {
    date: "2022-01-01",
    category: "market",
    description: "dummy-description",
    value: 1.00,
  };

  const initialTransactionData = {
    ...initialTransactionTableData,
    id: 1,
    user: "dummy-user",
  };

  describe("renders correctly", () => {

    renderTransactionsTableBeforeEach(initialTransactionData);

    it("renders column headers", () => {
      expect(screen.getByText("Data")).toBeVisible();
      expect(screen.getByText("Day")).toBeVisible();
      expect(screen.getByText("Description")).toBeVisible();
      expect(screen.getByText("Category")).toBeVisible();
      expect(screen.getByText("Value (USD)")).toBeVisible();
    });

    it("renders transaction buttons", () => {
      expect(screen.getByText("Add transaction")).toBeVisible();
      expect(screen.getByLabelText("Edit transaction")).toBeVisible();
      expect(screen.getByLabelText("Delete transaction")).toBeVisible();
    });

    it("renders initialTransactionTableData", () => {
      expect(screen.getByText(initialTransactionData.date)).toBeVisible();
      expect(screen.getByText("Market")).toBeVisible();
      expect(screen.getByText(initialTransactionData.description)).toBeVisible();
      expect(screen.getByText(initialTransactionData.value)).toBeVisible();
    });

    it("renders Add transaction modal form", () => {
      const addTransactionButton = screen.getByText("Add transaction");
      fireEvent.click(addTransactionButton);

      assertTransactionModalFieldsAndSaveButtonRenderings();
    });

    it("renders Edit transaction modal form", () => {
      const editTransactionButton = screen.getByLabelText("Edit transaction");
      fireEvent.click(editTransactionButton);

      expect(screen.getByText("Edit transaction")).toBeInTheDocument();

      assertTransactionModalFieldsAndSaveButtonRenderings();
    });

  });

  describe("works correctly", () => {

    localStorage.setItem("mymoney_token", "dummy-token");

    const wrapper = mountTransactionsTable(initialTransactionData);

    it("simulates the entering of a new transaction", async () => {
      const addTransactionButton = wrapper.find(Button).at(0);
      addTransactionButton.simulate("click");

      const newTransactionTableData = {
        date: "2022-01-02",
        category: "other",
        description: "another-dummmy-description",
        value: "2.00",
      };

      fillModalFields(newTransactionTableData, wrapper);

      const saveButton = wrapper.find(Button).at(1);
      await waitFor(() => saveButton.simulate("click"));

      expect(transactionsAPI.createTransaction).toBeCalledWith(
        "dummy-token",
        newTransactionTableData,
      );
      expect(wrapper.props().setLastPageOnNewTransaction).toBeCalledTimes(1);
      expect(wrapper.props().setLoadingToTrue).toBeCalledTimes(1);
      expect(wrapper.props().updateTableData).toBeCalledTimes(1);
    });

    it("simulates the editing of a transaction", async () => {
      const editTransactionButton = wrapper.find(IconButton).at(0);
      editTransactionButton.simulate("click");

      assertModalFieldsFilling(initialTransactionTableData, wrapper);

      const newEditedValue = "3.00";

      const valueField = wrapper.find(Input).at(2);
      valueField.simulate("change", {
        target: {
          value: newEditedValue,
        },
      });

      const saveButton = wrapper.find(Button).at(1);
      await waitFor(() => saveButton.simulate("click"));

      expect(transactionsAPI.editTransaction).toBeCalledWith(
        "dummy-token",
        initialTransactionData.id,
        {
          ...initialTransactionTableData,
          value: newEditedValue,
        },
      );
      expect(wrapper.props().setLoadingToTrue).toBeCalledTimes(1);
      expect(wrapper.props().updateTableData).toBeCalledTimes(1);
    });

    it("simulates the deletion of a transaction", () => {
      const deleteTransactionButton = wrapper.find(IconButton).at(1);
      deleteTransactionButton.simulate("click");

      expect(wrapper.props().deleteTransaction).toBeCalledWith(initialTransactionData.id);
    });

  });

});


function renderTransactionsTableBeforeEach(initialTransactionData: Transaction) {
  beforeEach(() => {
    render(
      <TransactionsTable
        data={{
          count: 1,
          page: 1,
          results: [initialTransactionData],
        }}
        deleteTransaction={jest.fn()}
        setLoadingToTrue={jest.fn()}
        updateTableData={jest.fn()}
        setLastPageOnNewTransaction={jest.fn()}
      />
    );
  });
}


const assertTransactionModalFieldsAndSaveButtonRenderings = () => {
  expect(screen.getByPlaceholderText("Date")).toBeInTheDocument();

  assertCategoryOptionsRendering();

  expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();

  expect(screen.getByPlaceholderText("Value")).toBeInTheDocument();

  expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
};


const assertCategoryOptionsRendering = () => {
  expect(screen.getByRole("option", { name: "Market" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Transportation" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Clothing" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Bills" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Health expenses" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Savings" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Other" })).toBeInTheDocument();
};


function mountTransactionsTable(initialTransactionData: Transaction) {
  const wrapper = mount(
    <TransactionsTable
      data={{
        count: 1,
        page: 1,
        results: [initialTransactionData],
      }}
      deleteTransaction={jest.fn()}
      setLoadingToTrue={jest.fn()}
      updateTableData={jest.fn()}
      setLastPageOnNewTransaction={jest.fn()}
    />
  );

  return wrapper;
}


const fillModalFields = (modalFieldsValues: any, wrapper: any) => {
  const dateField = wrapper.find(Input).at(0);
  dateField.simulate("change", {
    target: {
      value: modalFieldsValues.date,
    },
  });

  const categoryField = wrapper.find("select");
  categoryField.simulate("change", {
    target: {
      value: modalFieldsValues.category,
    },
  });

  const descriptionField = wrapper.find(Input).at(1);
  descriptionField.simulate("change", {
    target: {
      value: modalFieldsValues.description,
    },
  });

  const valueField = wrapper.find(Input).at(2);
  valueField.simulate("change", {
    target: {
      value: modalFieldsValues.value,
    },
  });
};


const assertModalFieldsFilling = (expectedModalFieldsValues: any, wrapper: any) => {
  const dateFieldValue = wrapper.find(Input).at(0).props().value;
  expect(dateFieldValue).toBe(expectedModalFieldsValues.date);

  const categoryFieldValue = wrapper.find("select").props().value;
  expect(categoryFieldValue).toBe(expectedModalFieldsValues.category);

  const descriptionFieldValue = wrapper.find(Input).at(1).props().value;
  expect(descriptionFieldValue).toBe(expectedModalFieldsValues.description);

  const valueFieldValue = wrapper.find(Input).at(2).props().value;
  expect(valueFieldValue).toBe(expectedModalFieldsValues.value);
};
