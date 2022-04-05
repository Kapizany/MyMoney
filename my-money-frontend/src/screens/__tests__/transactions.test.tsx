import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Transactions } from "../transactions";


const mockedUseNavigate = jest.fn();
jest.mock("react-router", () => ({
    useNavigate: () => mockedUseNavigate,
}));

const renderTransactions = () => {
    render(
        <Transactions
            selectedPage="transactions"
            setSelectedPage={jest.fn()}
        />
    );
};


describe("renders correctly", () => {

    it.skip("renders page heading", () => {
        renderTransactions();
        expect(screen.getByRole("heading", { name: "Transactions" }));
    });

});
