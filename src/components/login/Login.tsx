import React, {useState} from 'react';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import {CircularProgress, Paper, TextField, Container, Grid, Button, Typography} from "@material-ui/core";

import {LoginData} from '../../App.models';
import useStyles from '../../styles/styles';

const Login = () => {
    const classes = useStyles();
    const url: string = 'https://5f5f88addf620f00163e5e11.mockapi.io/users';
    const [loginText, setLoginText] = useState<string>('');
    const [loading, isLoading] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            email: "",
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
            return validateData(values)
        },
    });

    const validateData = async (data: LoginData) => {
        isLoading(true)
        setLoginText('');
        await axios.get(url)
            .then(response => {
                if (data.email === response.data?.email && data.password === response.data?.password) {
                    setLoginText("Logged in")
                } else {
                    setLoginText("Wrong login data")
                }
                isLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoginText('Api Error, try again')
            })
    }

    return (
        <React.Fragment>
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
            <Grid item>
                <Paper elevation={3} square={false} className={classes.root}>
                    <Grid container justify="center">
                        {loading && <CircularProgress color="primary"/>}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h3" gutterBottom align="center">
                            {loginText}
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}
export default Login;
