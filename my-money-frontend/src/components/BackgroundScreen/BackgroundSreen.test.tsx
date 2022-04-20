import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BackgroundScreen } from ".";


describe("Test BackgroundScreen component", () => {

  describe("renders correctly", () => {

    it("renders component's div", () => {
      const { container } = render(
        <BackgroundScreen>
          <button name="dummy-button">
            Dummy button
          </button>
        </BackgroundScreen>
      );
      expect(container.querySelector(`div[id="background-screen-component"]`)).toBeVisible();
    });

    it("renders component's children", () => {
      render(
        <BackgroundScreen>
          <button name="dummy-button">
            Dummy button
          </button>
        </BackgroundScreen>
      );
      expect(screen.getByRole("button", { "name": "Dummy button" })).toBeVisible();
    });

    it("renders with default props", () => {
      const { container } = render(
        <BackgroundScreen>
          <button name="dummy-button">
            Dummy button
          </button>
        </BackgroundScreen>
      );
      expect(container.querySelector(`div[id="background-screen-component"]`)).toHaveStyle("align-items: center");
      expect(container.querySelector(`div[id="background-screen-component"]`)).toHaveStyle("justify-content: center");
    });

    it("renders with given props", () => {
      const { container } = render(
        <BackgroundScreen
          alignItems="normal"
          justifyContent="flex-start"
          bg="#000"
        >
          <button name="dummy-button">
            Dummy button
          </button>
        </BackgroundScreen>
      );
      expect(container.querySelector(`div[id="background-screen-component"]`)).toHaveStyle("align-items: normal");
      expect(container.querySelector(`div[id="background-screen-component"]`)).toHaveStyle("justify-content: flex-start");
      expect(container.querySelector(`div[id="background-screen-component"]`)).toHaveStyle("background: #000");
    });

  });

});
