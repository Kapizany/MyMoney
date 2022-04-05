import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Pagination } from ".";
import { Button, MenuItem } from "@chakra-ui/react";


configure({ adapter: new Adapter() });


describe("Test Pagination component", () => {

    describe("renders correctly", () => {

        it("renders buttons and page numbers", () => {
            renderPagination(5, 1, 1);
            expect(screen.getByRole("button", { name: "<<" })).toBeVisible();
            expect(screen.getByRole("button", { name: "<" })).toBeVisible();
            expect(screen.getByText("Page 1/1")).toBeVisible();
            expect(screen.getByRole("button", { name: ">" })).toBeVisible();
            expect(screen.getByRole("button", { name: ">>" })).toBeVisible();
        });

        it("renders Page size dropdown menu", () => {
            renderPagination(5, 1, 1);
            expect(screen.getByText(/Page size: 5/)).toBeVisible();
            expect(screen.getByText("5")).toBeInTheDocument();
            expect(screen.getByText("10")).toBeInTheDocument();
            expect(screen.getByText("20")).toBeInTheDocument();
            expect(screen.getByText("50")).toBeInTheDocument();
        });

    });

    describe("works correctly", () => {

        describe("when currentPage is the first page", () => {

            it("does not call the functions associated with << button when it is clicked", () => {
                const wrapper = mountPagination(5, 1, 1);

                wrapper.find(Button).at(0).simulate("click");

                expect(wrapper.props().setFirstPage).not.toBeCalled();
                expect(wrapper.props().setLoadingToTrue).not.toBeCalled();
                expect(wrapper.props().updateData).not.toBeCalled();
            });

            it("does not call the functions associated with < button when it is clicked", () => {
                const wrapper = mountPagination(5, 1, 1);

                wrapper.find(Button).at(1).simulate("click");

                expect(wrapper.props().decreasePageByOne).not.toBeCalled();
                expect(wrapper.props().setLoadingToTrue).not.toBeCalled();
                expect(wrapper.props().updateData).not.toBeCalled();
            });

        });

        describe("when currentPage has a previous page", () => {

            it("calls the functions associated with << button when it is clicked", () => {
                const wrapper = mountPagination(5, 2, 2);

                wrapper.find(Button).at(0).simulate("click");

                expect(wrapper.props().setFirstPage).toBeCalledTimes(1);
                expect(wrapper.props().setLoadingToTrue).toBeCalledTimes(1);
                expect(wrapper.props().updateData).toBeCalledTimes(1);
            });

            it("calls the functions associated with < button when it is clicked", () => {
                const wrapper = mountPagination(5, 2, 2);

                wrapper.find(Button).at(1).simulate("click");

                expect(wrapper.props().decreasePageByOne).toBeCalledTimes(1);
                expect(wrapper.props().setLoadingToTrue).toBeCalledTimes(1);
                expect(wrapper.props().updateData).toBeCalledTimes(1);
            });

        });

        describe("when currentPage has a next page", () => {

            it("calls the functions associated with > button when it is clicked", () => {
                const wrapper = mountPagination(5, 1, 2);

                wrapper.find(Button).at(2).simulate("click");

                expect(wrapper.props().increasePageByOne).toBeCalledTimes(1);
                expect(wrapper.props().setLoadingToTrue).toBeCalledTimes(1);
                expect(wrapper.props().updateData).toBeCalledTimes(1);
            });

            it("calls the functions associated with >> button when it is clicked", () => {
                const wrapper = mountPagination(5, 1, 2);

                wrapper.find(Button).at(3).simulate("click");

                expect(wrapper.props().setLastPage).toBeCalledTimes(1);
                expect(wrapper.props().setLoadingToTrue).toBeCalledTimes(1);
                expect(wrapper.props().updateData).toBeCalledTimes(1);
            });

        });

        describe("when currentPage is the last page", () => {

            it("does not call the functions associated with > button when it is clicked", () => {
                const wrapper = mountPagination(5, 1, 1);

                wrapper.find(Button).at(2).simulate("click");

                expect(wrapper.props().increasePageByOne).not.toBeCalled();
                expect(wrapper.props().setLoadingToTrue).not.toBeCalled();
                expect(wrapper.props().updateData).not.toBeCalled();
            });

            it("does not call the functions associated with >> button when it is clicked", () => {
                const wrapper = mountPagination(5, 1, 1);

                wrapper.find(Button).at(3).simulate("click");

                expect(wrapper.props().setLastPage).not.toBeCalled();
                expect(wrapper.props().setLoadingToTrue).not.toBeCalled();
                expect(wrapper.props().updateData).not.toBeCalled();
            });

        });

        describe("test of Page size options", () => {

            const options = [5, 10, 20, 50];

            for (let pageSizeOption of options) {
                whenOptionIsAlreadySelected(options, pageSizeOption);
                whenOptionIsNotSelected(options, pageSizeOption);
            }

        });

    });

});


const renderPagination = (
        pageSize: number,
        currentPage: number,
        lastPage: number,
    ) => {
    render(
        <Pagination
            pageSize={pageSize}
            setPageSize={jest.fn()}
            setFirstPage={jest.fn()}
            decreasePageByOne={jest.fn()}
            currentPage={currentPage}
            lastPage={lastPage}
            increasePageByOne={jest.fn()}
            setLastPage={jest.fn()}
            setLoadingToTrue={jest.fn()}
            updateData={jest.fn()}
        />
    );
};


const mountPagination = (
        pageSize: number,
        currentPage: number,
        lastPage: number,
    ) => {
    const wrapper = mount(
        <Pagination
            pageSize={pageSize}
            setPageSize={jest.fn()}
            setFirstPage={jest.fn()}
            decreasePageByOne={jest.fn()}
            currentPage={currentPage}
            lastPage={lastPage}
            increasePageByOne={jest.fn()}
            setLastPage={jest.fn()}
            setLoadingToTrue={jest.fn()}
            updateData={jest.fn()}
        />
    );
    return wrapper;
};


function whenOptionIsAlreadySelected(options: number[], pageSizeOption: number) {
    it(`does not call the functions associated with option ${pageSizeOption} if pageSize is already ${pageSizeOption}`, () => {
        const wrapper = mountPagination(pageSizeOption, 1, 1);

        wrapper.find(MenuItem).at(options.indexOf(pageSizeOption)).simulate("click");

        expect(wrapper.props().setPageSize).not.toBeCalled();
        expect(wrapper.props().setFirstPage).not.toBeCalled();
        expect(wrapper.props().setLoadingToTrue).not.toBeCalled();
        expect(wrapper.props().updateData).not.toBeCalled();
    });
}


function whenOptionIsNotSelected(options: number[], pageSizeOption: number) {
    it(`calls the functions associated with option ${pageSizeOption} if pageSize differs from ${pageSizeOption}`, () => {
        const wrapper = mountPagination(options[(options.indexOf(pageSizeOption) + 1) % 4], 1, 1);

        wrapper.find(MenuItem).at(options.indexOf(pageSizeOption)).simulate("click");

        expect(wrapper.props().setPageSize).toBeCalledWith(pageSizeOption);
        expect(wrapper.props().setFirstPage).toBeCalledTimes(1);
        expect(wrapper.props().setLoadingToTrue).toBeCalledTimes(1);
        expect(wrapper.props().updateData).toBeCalledTimes(1);
    });
}
