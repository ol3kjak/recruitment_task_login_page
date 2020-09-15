import React, {useState} from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, CircularProgress, Container, Grid, Paper, TextField, Typography} from "@material-ui/core";

import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import {LoginData} from '../App.models';

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
        },
        paperForLogInInformation: {
            height: 100,
            textAlign: 'center'
        }
    }),
);


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
            validateData(values)
        },
    });

    const validateData = (data: LoginData) => {
        isLoading(true)
        axios.get(url)
            .then(response => {
                if (data.email === response.data?.email && data.password === response.data?.password) {
                    setLoginText("Logged in")
                } else {
                    setLoginText("Wrong login data")
                }
                isLoading(false)
            })
            .catch(err => console.log(err))
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
                        {loading && <CircularProgress color="secondary"/>}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h2" gutterBottom align="center">
                            {loginText}
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}
export default Login;
