import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { YearSelector } from ".";


describe("Test Year Selector Component", () => {

    it("should render year selector if no option is passed into years prop", () => {
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

    it("should render year selector if one option is passed into years prop", () => {
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

    it("should render same year options passed into years prop", () => {
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
