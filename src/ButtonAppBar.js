import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import axios from "./AxiosConfig";
import {withRouter} from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },

};

function Logout({History}){
    axios.post('/logout')
        .then((response) =>{
            History.push("/")
        })
        .catch((error) =>{
        })
}
function LogoutButtonBase({history}){
    return <Button variant="raised" color="secondary"  onClick={() => Logout({History: history})}>Logout</Button>
}
const LogoutButton = withRouter(LogoutButtonBase);
function ButtonAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Admin Page
                    </Typography>
                    <LogoutButton/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);