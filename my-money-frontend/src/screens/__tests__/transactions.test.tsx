import { render, screen } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import { Transactions } from "../transactions";
import { BackgroundScreen } from "../../components/BackgroundScreen";
import { Header } from "../../components/Header";
import { SideBarMenu } from "../../components/SideBarMenu";
import { Pagination } from "../../components/Pagination";
import { TransactionsTable } from "../../components/TransactionsTable";


const mockedUseNavigate = jest.fn();
jest.mock("react-router", () => ({
    useNavigate: () => mockedUseNavigate,
}));


describe("Test Transactions page", () => {

    describe("renders components correctly", () => {

        const testRenderer = TestRenderer.create(
            <Transactions
                selectedPage="transactions"
                setSelectedPage={jest.fn()}
            />
        );

        it("renders BackgroundScreen", () => {
            expect(() => testRenderer.root.findByType(BackgroundScreen)).not.toThrow();
        });

        it("renders Header", () => {
            expect(() => testRenderer.root.findByType(Header)).not.toThrow();
        });

        it("renders SideBarMenu", () => {
            expect(() => testRenderer.root.findByType(SideBarMenu)).not.toThrow();
        });

        it("renders Pagination", () => {
            expect(() => testRenderer.root.findAllByType(Pagination)).not.toThrow();
        });

        it("renders TransactionsTable", () => {
            expect(() => testRenderer.root.findByType(TransactionsTable)).not.toThrow();
        });

    });

    it("renders page heading correctly", () => {
        render(
            <Transactions
                selectedPage="transactions"
                setSelectedPage={jest.fn()}
            />
        );
        expect(screen.getByRole("heading", { name: "Transactions" }));
    });

});
