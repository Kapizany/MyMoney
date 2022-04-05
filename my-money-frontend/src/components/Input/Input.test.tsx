import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Input } from ".";


describe("Test Input component", () => {

    it("renders correctly", () => {
        const { container } = render(
            <Input
                name="dummy-name"
                placeholder="dummy-placeholder"
                label="dummy-label"
            />
        );
        expect(container.querySelector(`input[name="dummy-name"]`)).toBeVisible();
        expect(container.querySelector(`input[placeholder="dummy-placeholder"]`)).toBeVisible();
        expect(container.querySelector(`input[label="dummy-label"]`)).toBeVisible();
    });

    it("works correctly", () => {
        const { container } = render(
            <Input
                name="dummy-name"
                placeholder="dummy-placeholder"
                label="dummy-label"
            />
        );

        const input = container.querySelector(`input[name="dummy-name"]`) as HTMLInputElement;

        if (input) {
            fireEvent.change(input, { target: { value: "dummy-value" } });
        }

        expect(input?.value).toBe("dummy-value");
    });

});
