import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Login } from '../login';


const mockedUsedNavigate = jest.fn();
jest.mock('react-router', () => ({
    useNavigate: () => mockedUsedNavigate,
}));

describe('Test Login Page', () => {

    it("renders login page correctly", () => {
        const {container} = render(
            <Login />
        );
        expect(container.querySelector(`input[name="username"]`)).toBeVisible()
        expect(container.querySelector(`input[name="password"]`)).toBeVisible();
        expect(screen.getByPlaceholderText("Email")).toBeVisible();
        expect(screen.getByPlaceholderText("Password")).toBeVisible();
        expect(screen.getByText(/Forgot password/)).toBeVisible();
        expect(screen.getByRole("button", { "name": /Sign in/})).toBeVisible();
    });

})
