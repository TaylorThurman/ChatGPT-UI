import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import Home from "./pages/Home";
import theme from "./theme";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>,
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            {/*<ColorModeScript initialColorMode={theme.config.initialColorMode} />*/}
            <RouterProvider router={router}/>
        </ChakraProvider>
    </React.StrictMode>,
)
