import React from 'react';
import Login from '../components/login/Login';

import {Box, Container} from "@material-ui/core";


export default function App() {
    return (
        <Container maxWidth="sm">
            <Box mt={6}>
                <Login/>
            </Box>
        </Container>
    );
}
