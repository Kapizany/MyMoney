import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { YearSelector } from ".";


describe("Test YearSelector component", () => {

    it("should render YearSelector if no option is passed into years prop", () => {
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

    it("should render YearSelector if one option is passed into years prop", () => {
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

    it("should render YearSelector with more than one year option passed into years prop", () => {
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
