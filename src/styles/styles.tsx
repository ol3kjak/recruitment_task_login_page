import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

export default useStyles;
