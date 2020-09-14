import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Grid, Paper, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '5vh 0',
            margin: theme.spacing(2),
            textAlign: "center",
            backgroundColor: "#fafafa",
        },
    }),
);


const Login = () => {
    const classes = useStyles();
    return (
        <Paper elevation={3} square={false} className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={10}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextField id="email" label="email" type="email" variant="outlined"/>
                </Grid>
                <Grid item xs={10}>
                    <TextField id="password" label="password" type="password" variant="outlined"/>
                </Grid>
                <Grid item xs={10}>
                    <Button
                        color="primary"
                        variant="contained"
                        size="medium"
                    >
                        SUBMIT
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default function App() {
    return (
        <Container maxWidth="sm">
            <Box mt={6}>
                <Login/>
            </Box>
        </Container>
    );
}
