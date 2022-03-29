import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { BackgroundScreen } from '../../components/BackgroundScreen';




describe('Test BackgroundScreen Component', () => {

    it("renders correctly", () => {
        const {container} = render(
            <BackgroundScreen bg="#000">
                <button name="fake-botao">
                    Fake botao
                </button>
            </BackgroundScreen>
        );
        expect(screen.getByRole('button',{'name':"Fake botao"})).toBeVisible()
        expect(container.querySelector(`div[id="background-screen-component"]`)).toBeVisible()
        expect(container.querySelector(`div[id="background-screen-component"]`)).toHaveStyle('background: #000')
        screen.debug()
    });

})
