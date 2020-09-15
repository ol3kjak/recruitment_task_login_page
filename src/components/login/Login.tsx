import React, {Fragment, useState} from 'react';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios, {AxiosError, AxiosResponse} from 'axios';

import {Button, CircularProgress, Container, Grid, Paper, TextField, Typography} from '@material-ui/core';
import useStyles from '../../styles/styles';

import {UserResponse, FormValues} from '../../App.models';
import {URL_GET_USER} from '../../utils/Utils';

const Login: React.FC = () => {
    const classes = useStyles();
    const [loginText, setLoginText] = useState<string>('');
    const [loading, isLoading] = useState<boolean>(false)

    const formik = useFormik<FormValues>({
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
        onSubmit: (values: FormValues) => {
            return validateData(values)
        },
    });

    const validateData = async (data: FormValues): Promise<any> => {
        isLoading(true)
        setLoginText('');
        await axios.get(URL_GET_USER)
            .then((response: AxiosResponse<UserResponse>) => {
                if (data.email === response.data?.email && data.password === response.data?.password) {
                    setLoginText("Logged in")
                } else {
                    setLoginText("Wrong login data")
                }
            })
            .catch((err: AxiosError<any>) => {
                console.log(err)
                setLoginText("Api Error, try again")
            })
        isLoading(false)
    }

    return (
        <Fragment>
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
                {loading && (
                    <Paper elevation={3} square={false} className={classes.root}>
                        <Grid container justify="center">
                            <CircularProgress color="primary"/>
                        </Grid>
                    </Paper>
                )}
                {Boolean(loginText.length) && (
                    <Paper elevation={3} square={false} className={classes.root}>
                        <Grid item xs={12}>
                            <Typography variant="h3" component="h3" gutterBottom align="center">
                                {loginText}
                            </Typography>
                        </Grid>
                    </Paper>
                )}
            </Grid>
        </Fragment>
    );
}
export default Login;
