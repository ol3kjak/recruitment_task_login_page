import React from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Container, Grid, Paper, TextField, Typography} from "@material-ui/core";

import {useFormik} from 'formik';
import * as Yup from 'yup';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'block',
            minWidth: 200,
            padding: '5vh 0 2vh 0',
            marginBottom: theme.spacing(3),
            flexWrap: 'wrap',
        },
        formClass: {
            display: 'block',
            backgroundColor: 'white ',
            minWidth: '90%',
        },
        errorMessage: {
            display: 'inline-block',
            height: 15,
            fontSize: 10,
            color: "red",
        },
        buttonAdditionalClass: {
            marginTop: 50,
        }
    }),
);

const Login = () => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/,
                    {message: "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter and one number"})
                .required('Required'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Paper elevation={3} square={false} className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={10}>
                    <Typography variant="h3" component="h1" gutterBottom align="center">
                        Login
                    </Typography>
                </Grid>
                <Container maxWidth="md">
                    <form onSubmit={formik.handleSubmit} className={classes.formClass}>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                {...formik.getFieldProps('email')}
                                error={Boolean(formik.touched.email && formik.errors.email)}
                            />
                            <span className={classes.errorMessage}>
                                {formik.touched.email && formik.errors.email ? (
                                    formik.errors.email) : ''}
                            </span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                {...formik.getFieldProps('password')}
                                error={Boolean(formik.touched.password && formik.errors.password)}
                            />
                            <span className={classes.errorMessage}>
                                {formik.touched.password && formik.errors.password ? (
                                    formik.errors.password) : null}
                            </span>
                        </Grid>
                        <Grid container justify="center">
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                type="submit"
                                className={classes.buttonAdditionalClass}
                            >
                                SUBMIT
                            </Button>
                        </Grid>
                    </form>
                </Container>
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
