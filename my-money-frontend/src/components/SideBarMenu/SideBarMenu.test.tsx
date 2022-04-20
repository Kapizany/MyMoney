import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { SideBarMenu } from ".";


const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUseNavigate,
}));


describe("Test SideBarMenu component", () => {

  describe("renders correctly", () => {

    it("renders avatar and name container", () => {
      const { container } = render(
        <SideBarMenu selectedPage="" fullName="" />
      );
      expect(container.querySelector(`div[id="avatar-and-name-container"]`)).toBeVisible();
    });

    describe("renders page options", () => {

      renderSideBarMenuBeforeEach();

      it("renders dashboard page option", () => {
        expect(screen.getByText("Dashboard")).toBeVisible();
      });

      it("renders statement page option", () => {
        expect(screen.getByText("Statement")).toBeVisible();
      });

      it("renders transactions page option", () => {
        expect(screen.getByText("Transactions")).toBeVisible();
      });

    });

  });

  describe("works correctly", () => {

    renderSideBarMenuBeforeEach();

    it("should call useNavigate when Dashboard option is clicked", () => {
      const dashboardPageOption = screen.getByText("Dashboard");
      fireEvent.click(dashboardPageOption);
      expect(mockedUseNavigate).toBeCalledWith("/dashboard");
    });

    it("should call useNavigate when Transactions option is clicked", () => {
      const transactionsPageOption = screen.getByText("Transactions");
      fireEvent.click(transactionsPageOption);
      expect(mockedUseNavigate).toBeCalledWith("/transactions");
    });

  });

});


function renderSideBarMenuBeforeEach() {
  beforeEach(() => {
    render(<SideBarMenu selectedPage="" fullName="" />);
  });
}
