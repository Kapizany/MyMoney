import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Login } from "../login";
import { loginAPI } from "../../api/login";


jest.mock("react", () => ({
    ...jest.requireActual("react"),
}));

const mockedUseNavigate = jest.fn();
jest.mock("react-router", () => ({
    useNavigate: () => mockedUseNavigate,
}));

jest.mock("../../api/login");


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
            //@ts-ignore
            loginAPI.createToken.mockResolvedValueOnce({data:{token:"dummy-token"}});
            const emailField = screen.getByPlaceholderText("Email") as HTMLInputElement;
            const passwordField = screen.getByPlaceholderText("Password") as HTMLInputElement;

            fireEvent.change(emailField, { target: { value: "dummy-email" } });
            fireEvent.change(passwordField, { target: { value: "dummy-password" } });
            expect(emailField?.value).toBe("dummy-email");
            expect(passwordField?.value).toBe("dummy-password");

            const signInButton = screen.getByRole("button", { "name": /Sign in/ });
            fireEvent.click(signInButton); 
            expect(loginAPI.createToken).toHaveBeenCalledTimes(1);
            expect(loginAPI.createToken).toBeCalledWith({
                "password": "dummy-password",
                "username": "dummy-email",
            });
            
            await waitFor(() => localStorage.getItem("mymoney_token"));
            expect(localStorage.getItem("mymoney_token")).toBe("dummy-token");
            expect(mockedUseNavigate).toBeCalledWith("/dashboard");

        });

    });

});
