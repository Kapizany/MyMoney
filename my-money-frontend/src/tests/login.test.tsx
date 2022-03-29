import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { Login } from '../screens/login';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router', () => ({
   useNavigate: () => mockedUsedNavigate,
 }));

describe('Test Login Page', () => {

    it("should render correctly", () => {
        const {container} = render(
            <Login />
        );
        expect(container.querySelector(`input[name="username"]`)).toBeInTheDocument()
        expect(container.querySelector(`input[name="password"]`)).toBeInTheDocument();
        expect(screen.getByText(/esqueceu a senha/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { "name": /entrar/i})).toBeInTheDocument();
        screen.debug()
    });
})
