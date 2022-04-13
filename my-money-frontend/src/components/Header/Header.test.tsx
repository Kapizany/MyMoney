import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from ".";


describe("Test Header component", () => {

    describe("renders correctly", () => {

        it("renders logo", () => {
            render(<Header />);
            expect(screen.getByRole("heading", { name: "MyMoney" })).toBeVisible();
        });

        describe("renders LanguageDropdownMenu", () => {

            it("renders English option", () => {
                render(<Header />);
                expect(screen.getByText("English")).toBeInTheDocument();
            });

            it("renders Portuguese option", () => {
                render(<Header />);
                expect(screen.getByText("Portuguese")).toBeInTheDocument();
            });

            it("renders Spanish option", () => {
                render(<Header />);
                expect(screen.getByText("Spanish")).toBeInTheDocument();
            });

        });

        describe("renders AccountDropdownMenu", () => {

            it("renders Manage account option", () => {
                render(<Header />);
                expect(screen.getByText("Manage account")).toBeInTheDocument();
            });

            it("renders Settings option", () => {
                render(<Header />);
                expect(screen.getByText("Settings")).toBeInTheDocument();
            });

            it("renders Help option", () => {
                render(<Header />);
                expect(screen.getByText("Help")).toBeInTheDocument();
            });

            it("renders Sign out option", () => {
                render(<Header />);
                expect(screen.getByText("Sign out")).toBeInTheDocument();
            });

        });

    });

});
