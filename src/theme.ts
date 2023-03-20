import {extendTheme, StyleFunctionProps, type ThemeConfig} from '@chakra-ui/react'


// 3. extend the theme
const theme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                height: '100vh',
                bg: 'gray.800',
                color: 'gray.100',
            },
        })
    }
})

export default theme