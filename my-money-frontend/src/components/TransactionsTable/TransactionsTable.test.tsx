import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { TransactionsTable } from ".";


describe("Test TransactionsTable component", () => {

    it("renders column headers and transaction buttons correctly", () => {
        renderTransactionTable();

        expect(screen.getByText("Data")).toBeVisible();
        expect(screen.getByText("Day")).toBeVisible();
        expect(screen.getByText("Description")).toBeVisible();
        expect(screen.getByText("Category")).toBeVisible();
        expect(screen.getByText("Value (USD)")).toBeVisible();
        expect(screen.getByText("Add transaction")).toBeVisible();

        expect(screen.getByLabelText("Edit transaction")).toBeVisible();
        expect(screen.getByLabelText("Delete transaction")).toBeVisible();
    });

    it("renders Add transaction modal correctly", () => {
        renderTransactionTable();

        const addTransactionButton = screen.getByText("Add transaction");
        fireEvent.click(addTransactionButton);

        assertTransactionModalFieldsAndSaveButton();
    });

    it("renders Edit transaction modal correctly", () => {
        renderTransactionTable();

        const editTransactionButton = screen.getByLabelText("Edit transaction");
        fireEvent.click(editTransactionButton);

        expect(screen.getByText("Edit transaction")).toBeInTheDocument();

        assertTransactionModalFieldsAndSaveButton();
    });

});


const renderTransactionTable = () => {
    render(
        <TransactionsTable
            data={{
                count: 1,
                page: 1,
                results: [{
                    id: 1,
                    category: "market",
                    value: 1,
                    date: "2022-01-02",
                    description: "description",
                    user: "user",
                }],
            }}
            deleteTransaction={jest.fn()}
            setLoadingToTrue={jest.fn()}
            updateTableData={jest.fn()}
            setLastPageOnNewTransaction={jest.fn()}
        />
    );
};


const assertTransactionModalFieldsAndSaveButton = () => {
    expect(screen.getByPlaceholderText("Date")).toBeInTheDocument();

    assertCategoriesOptions();

    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Value")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
};


const assertCategoriesOptions = () => {
    expect(screen.getByRole("option", { name: "Market"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Transportation"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Clothing"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Bills"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Health expenses"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Savings"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Other"})).toBeInTheDocument();
};
