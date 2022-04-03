import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BackgroundScreen } from ".";


describe("Test BackgroundScreen component", () => {

    it("renders div", () => {
        const { container } = render(
            <BackgroundScreen>
                <button name="fake-button">
                    Fake button
                </button>
            </BackgroundScreen>
        );
        expect(container.querySelector(`div[id="background-screen-component"]`)).toBeVisible();
    });

    it("renders children correctly", () => {
        render(
            <BackgroundScreen>
                <button name="fake-button">
                    Fake button
                </button>
            </BackgroundScreen>
        );
        expect(screen.getByRole("button", { "name": "Fake button" })).toBeVisible();
    });

    it("renders with background prop", () => {
        const { container } = render(
            <BackgroundScreen bg="#000">
                <button name="fake-button">
                    Fake button
                </button>
            </BackgroundScreen>
        );
        expect(container.querySelector(`div[id="background-screen-component"]`)).toHaveStyle("background: #000");
    });

});
