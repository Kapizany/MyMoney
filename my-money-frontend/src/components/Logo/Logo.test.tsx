import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Logo } from ".";


describe("Test Logo component", () => {

    it("renders correctly", () => {
        render(<Logo />);
        expect(screen.getByRole("heading", { name: "MyMoney" })).toBeVisible();
    });

});
