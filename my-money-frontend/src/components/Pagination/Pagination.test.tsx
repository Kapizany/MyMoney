import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Pagination } from ".";


describe("Test Pagination component", () => {

    it("renders buttons and page numbers correctly", () => {
        renderPagination();
        expect(screen.getByRole("button", { name: "<<" })).toBeVisible();
        expect(screen.getByRole("button", { name: "<" })).toBeVisible();
        expect(screen.getByText("Page 1/1")).toBeVisible();
        expect(screen.getByRole("button", { name: ">" })).toBeVisible();
        expect(screen.getByRole("button", { name: ">>" })).toBeVisible();
    });

    it("renders Page size dropdown menu correctly", () => {
        renderPagination();
        expect(screen.getByText(/Page size: 5/)).toBeVisible();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.getByText("20")).toBeInTheDocument();
        expect(screen.getByText("50")).toBeInTheDocument();
    });

});


const renderPagination = () => {
    render(
        <Pagination
            pageSize={5}
            setPageSize={jest.fn()}
            setFirstPage={jest.fn()}
            decreasePageByOne={jest.fn()}
            currentPage={1}
            lastPage={1}
            increasePageByOne={jest.fn()}
            setLastPage={jest.fn()}
            setLoadingToTrue={jest.fn()}
            updateData={jest.fn()}
        />
    );
};
