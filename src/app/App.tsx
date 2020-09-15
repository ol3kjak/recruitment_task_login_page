import React from 'react';
import Login from '../components/login/Login';

import {Box, Container} from "@material-ui/core";

const App: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Box mt={6}>
                <Login/>
            </Box>
        </Container>
    );
}
export default App
