import React , {Component} from 'react';
import ButtonAppBar from "./ButtonAppBar";
import axios from "./AxiosConfig";
import TextField from 'material-ui/TextField';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';


const styles = {
    textField: {
        marginLeft: 80,

        width: 500,

    },
    button: {
        marginLeft: 25

    }
};

class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {link:""}
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    state = {
        open: false,
        vertical: null,
        horizontal: null,
    };

    handleClick = state => () => {
        this.setState({ open: true, ...state });
        this.updateOpenSection()
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount(){
        axios.get("/user/whoami")
            .then((response) =>{
                if (response.data.role[0].role !== "admin"){
                    this.props.history.push('/Schedule')
                }
            }).catch((error) => {
        })
    }

    updateInputValue(evt){
        this.setState({link: evt.target.value});
    }

    updateOpenSection(){
        axios.post(`/course/updatecourse/`+this.state.link)
            .then((response) =>{
            }).catch((error) => {
        })
    }

    render(){
        const {classes} = this.props;
        const { vertical, horizontal, open } = this.state;

        return(
            <div>
                <ButtonAppBar/>
                <div className={"BoxOfText"}>
                <TextField className={classes.textField} label={"Please put the number of the end of the opensection's URL here"} onChange={this.updateInputValue}/>
                    <Button variant="raised" color="secondary" className={classes.button} onClick={this.handleClick({ vertical: 'top', horizontal: 'center' })}>
                        Update
                    </Button>
                </div>

                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={1000}
                    onClose={this.handleClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">DONE</span>}
                />
            </div>
        )}
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);