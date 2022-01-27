import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        gray: {
            "900": "#181b23",
            "800": "#1f2029",
            "700": "#353646",
            "600": "#4b4d63",
            "500": "#616480",
            "400": "#797d9a",
            "300": "#9699b0",
            "200": "#b3b5c6",
            "100": "#d1d2dc",
            "50": "#eeeef2"
        },
        dollar: {
            "900": "#043927",
            "800": "#2E8B57",
            "700": "#01796F",
            "600": "#00A572",
            "500": "#40ca6e",
            "400": "#4af784",
            "300": "#6aefba",
            "200": "#78e49c",
            "100": "#98FB98",
            "50": "#befdbe"
        }
    },
    fonts: {
        heading: "Roboto",
        body: "Roboto",
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color:'gray.50'
            }
        }
    }
});