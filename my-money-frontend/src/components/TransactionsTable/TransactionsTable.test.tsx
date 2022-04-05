import { act } from 'react-dom/test-utils';
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TransactionsTable } from ".";
import { Button, IconButton, Input, Select } from "@chakra-ui/react";
import { transactionsAPI } from "../../api/transactions";


configure({ adapter: new Adapter() });


describe("Test TransactionsTable component", () => {

    describe("renders correctly", () => {

        renderTransactionsTableBeforeEach();

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

        it("renders Add transaction modal", () => {
            const addTransactionButton = screen.getByText("Add transaction");
            fireEvent.click(addTransactionButton);

            assertTransactionModalFieldsAndSaveButton();
        });

        it("renders Edit transaction modal", () => {
            const editTransactionButton = screen.getByLabelText("Edit transaction");
            fireEvent.click(editTransactionButton);

            expect(screen.getByText("Edit transaction")).toBeInTheDocument();

            assertTransactionModalFieldsAndSaveButton();
        });

    });

    describe("works correctly", () => {

        it("simulates the entering of a new transaction", async () => {
            localStorage.setItem("mymoney_token", "dummy-token");

            const wrapper = mountTransactionsTable();

            const addTransactionButton = wrapper.find(Button).at(0);
            addTransactionButton.simulate("click");

            wrapper.find(Input).at(0).simulate("change", {
                target: {
                    value: "2022-01-02"
                }
            });

            wrapper.find("select").simulate("change", {
                target: {
                    value: "market"
                }
            });

            wrapper.find(Input).at(1).simulate("change", {
                target: {
                    value: "description"
                }
            });

            wrapper.find(Input).at(2).simulate("change", {
                target: {
                    value: "1.00"
                }
            });

            const saveButton = wrapper.find(Button).at(1);
            await waitFor(() => saveButton.simulate("click"));

            expect(transactionsAPI.createTransaction).toBeCalledWith(
                "dummy-token",
                {
                    "category": "market",
                    "date": "2022-01-02",
                    "description": "description",
                    "value": "1.00",
                },
            );
            expect(wrapper.props().setLastPageOnNewTransaction).toBeCalledTimes(1);
            expect(wrapper.props().setLoadingToTrue).toBeCalledTimes(1);
            expect(wrapper.props().updateTableData).toBeCalledTimes(1);
        });

        it("calls deleteTransaction with the correct id when Delete transaction button is clicked", () => {
            const wrapper = mountTransactionsTable();

            wrapper.find(IconButton).at(1).simulate("click");

            expect(wrapper.props().deleteTransaction).toBeCalledWith(1);
        });

    });

});


function renderTransactionsTableBeforeEach() {
    beforeEach(() => {
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
    });
}


const assertTransactionModalFieldsAndSaveButton = () => {
    expect(screen.getByPlaceholderText("Date")).toBeInTheDocument();

    assertCategoryOptions();

    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Value")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
};


const assertCategoryOptions = () => {
    expect(screen.getByRole("option", { name: "Market"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Transportation"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Clothing"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Bills"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Health expenses"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Savings"})).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Other"})).toBeInTheDocument();
};


function mountTransactionsTable() {
    const wrapper = mount(
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
    return wrapper;
}


jest.mock("react", () => ({
    ...jest.requireActual("react"),
}));


jest.mock("../../api/transactions");
