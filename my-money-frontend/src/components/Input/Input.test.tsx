import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Input } from ".";


describe("Test Input component", () => {

    it("renders correctly", () => {
        const { container } = render(
            <Input
                name="fake-name"
                placeholder="fake-placeholder"
                label="fake-label"
            />
        );
        expect(container.querySelector(`input[name="fake-name"]`)).toBeVisible();
        expect(container.querySelector(`input[placeholder="fake-placeholder"]`)).toBeVisible();
        expect(container.querySelector(`input[label="fake-label"]`)).toBeVisible();
    });

    it("works correctly", () => {
        const { container } = render(
            <Input
                name="fake-name"
                placeholder="fake-placeholder"
                label="fake-label"
            />
        );

        const input = container.querySelector(`input[name="fake-name"]`) as HTMLInputElement;

        if(input){
            fireEvent.change(input, { target: { value: "fake-value" } });
        }

        expect(input?.value).toBe("fake-value");
    });

});
