import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { YearSelector } from "..";


describe('Test Year Selector Components', () => {

  it("should render same year passed into year prop", () => {
    render(
      <YearSelector
        years={["2022"]}
        year="2022"
        setYear={() => {}}
        setLoading={() => {}}
      />
    );
    const optionElement2022 = screen.getByRole("option", { "name": "2022"})
    expect(optionElement2022).toBeInTheDocument();
    expect(screen.getByText(/year/i)).toBeInTheDocument();

  });

  it("should render same array passed into years prop", () => {
    render(
      <YearSelector
        years={["2022", "2021"]}
        year="2022"
        setYear={() => {}}
        setLoading={() => {}}
      />
    );
    expect(screen.getByRole("option", { "name": "2022"})).toBeInTheDocument();
    expect(screen.getByRole("option", { "name": "2021"})).toBeInTheDocument();
    
  });

})
