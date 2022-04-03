import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Login } from "../login";


const mockedUseState = jest.fn();
jest.mock("react", () => ({
useState: () => mockedUseState,
}));

const mockedUseNavigate = jest.fn();
jest.mock("react-router", () => ({
    useNavigate: () => mockedUseNavigate,
}));

jest.mock("../../api/login", () => ({
    loginAPI: {
        createToken: (data: { username: string; password: string }) => {
            return "dummy-token";
        }
    },
}));


describe("Test Login page", () => {

    describe("renders correctly", () => {

        it("renders Email input", () => {
            const { container } = render(<Login />);
            expect(container.querySelector(`input[name="username"]`)).toBeVisible();
            expect(screen.getByPlaceholderText("Email")).toBeVisible();
        });

        it("renders Email input", () => {
            const { container } = render(<Login />);
            expect(container.querySelector(`input[name="password"]`)).toBeVisible();
            expect(screen.getByPlaceholderText("Password")).toBeVisible();
        });

        it("renders Forgot password link", () => {
            render(<Login />);
            expect(screen.getByText(/Forgot password/)).toBeVisible();
        });

        it("renders Sign in button", () => {
            render(<Login />);
            expect(screen.getByRole("button", { "name": /Sign in/ })).toBeVisible();
        });

    });

    describe("works correctly", () => {

        it("calls loginAPI.createToken when Sign in button is clicked", async () => {
            render(<Login />);

            const [username, setUsername] = useState("");
            const [password, setPassword] = useState("");

            const emailField = screen.getByPlaceholderText("Email");
            const passwordField = screen.getByPlaceholderText("Password");

            fireEvent.change(emailField, { target: { value: "dummy-email" } });
            fireEvent.change(passwordField, { target: { value: "dummy-password" } });

            const signInButton = screen.getByRole("button", { "name": /Sign in/ });
            fireEvent.click(signInButton); // err comes from this line
            // expect(loginAPI.createToken).toBeCalled();
        });

    });

});
