import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Transactions } from "../transactions";


const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
    useNavigate: () => mockedUsedNavigate,
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

    it("renders page heading", () => {
        renderTransactions();
        expect(screen.getByRole("heading", { name: "Transactions" }));
    });

});
