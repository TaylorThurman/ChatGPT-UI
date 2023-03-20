import {Outlet} from "react-router-dom";
import React from "react";
import {Box} from "@chakra-ui/react";

function App() {
    return (
        <Box h='calc(100vh)' overflow={"hidden"}>
            <Outlet/>
        </Box>
    )
}

export default App
