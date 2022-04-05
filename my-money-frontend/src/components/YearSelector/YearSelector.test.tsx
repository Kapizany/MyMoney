import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { YearSelector } from ".";


describe("Test YearSelector component", () => {

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
