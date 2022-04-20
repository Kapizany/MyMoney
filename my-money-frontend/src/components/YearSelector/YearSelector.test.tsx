import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { YearSelector } from ".";


configure({ adapter: new Adapter() });


describe("Test YearSelector component", () => {

  describe("renders correctly", () => {

    it("renders YearSelector if no option is passed into years prop", () => {
      render(
        <YearSelector
          years={[]}
          year="2022"
          setYear={() => {}}
          setLoading={() => {}}
        />
      );
      expect(screen.getByText(/Year:/)).toBeVisible();
    });

    it("renders YearSelector if one option is passed into years prop", () => {
      render(
        <YearSelector
          years={["2022"]}
          year="2022"
          setYear={() => {}}
          setLoading={() => {}}
        />
      );
      expect(screen.getByText(/Year:/)).toBeVisible();
    });

    it("renders YearSelector with more than one year option passed into years prop", () => {
      render(
        <YearSelector
          years={["2022", "2021"]}
          year="2022"
          setYear={() => {}}
          setLoading={() => {}}
        />
      );
      expect(screen.getByText(/Year:/)).toBeVisible();
      expect(screen.getByRole("option", { name: "2022" })).toBeVisible();
      expect(screen.getByRole("option", { name: "2021" })).toBeVisible();
    });

  });

  describe("works correctly", () => {

    it("calls appropriate functions with correct arguments when a year is selected", () => {
      const wrapper = mount(
        <YearSelector
          years={["2022", "2021"]}
          year="2022"
          setYear={jest.fn()}
          setLoading={jest.fn()}
        />
      );
      wrapper.find("select").simulate("change", {
        target: {
          value: "2021",
        },
      });
      expect(wrapper.props().setYear).toBeCalledWith("2021");
      expect(wrapper.props().setLoading).toBeCalledWith(true);
    });

  });

});
