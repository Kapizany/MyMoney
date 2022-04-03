import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { SideBarMenu } from ".";


const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedUsedNavigate,
}));

describe("Test SideBarMenu component", () => {

    describe("renders correctly", () => {

        it("renders avatar and name container", () => {
            const { container } = render(
                <SideBarMenu selectedPage="" />
            );
            expect(container.querySelector(`div[id="avatar-and-name-container"]`)).toBeVisible();
        });

        it("renders dashboard page option", () => {
            render(
                <SideBarMenu selectedPage="" />
            );
            expect(screen.getByText("Dashboard")).toBeVisible();
        });

        it("renders statement page option", () => {
            render(
                <SideBarMenu selectedPage="" />
            );
            expect(screen.getByText("Statement")).toBeVisible();
        });

        it("renders transactions page option", () => {
            render(
                <SideBarMenu selectedPage="" />
            );
            expect(screen.getByText("Transactions")).toBeVisible();
        });

    });

    describe("works correctly", () => {

        it("should call useNavigate when Dashboard option is clicked", () => {
            render(
                <SideBarMenu selectedPage="" />
            );
            const dashboardPageOption = screen.getByText("Dashboard");
            fireEvent.click(dashboardPageOption);
            expect(mockedUsedNavigate).toBeCalledWith("/dashboard");
        });

        it("should call useNavigate when Transactions option is clicked", () => {
            render(
                <SideBarMenu selectedPage="" />
            );
            const transactionsPageOption = screen.getByText("Transactions");
            fireEvent.click(transactionsPageOption);
            expect(mockedUsedNavigate).toBeCalledWith("/transactions");
        });

    });

});
