import React, { Component } from 'react';
import './App.css'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import urlencode from "form-urlencoded";
import axios from "./AxiosConfig";
import { Redirect} from "react-router-dom";



class Login extends Component{

    constructor(props){
        super(props);
        this.state = {userName:"", email:"",password: "",
            ccPassword: "", redirect: false}
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);


    }
    updateInputValue(evt){
        this.setState({userName: evt.target.value});
    }
    updatePasswordValue(evt){
        this.setState({password: evt.target.value});
    }


    login(e){
        e.preventDefault();

        const loginParams = {
            username: this.state.userName,
            password: this.state.password
        };

        axios.post("/login", urlencode(loginParams))
            .then((response) => {
                console.log("THIS IS LOGIN")

                console.log(response.data.login);


                this.props.history.push('/Schedule');
            })
            .catch((error) => {
                alert("Username or Password are incorrect, Please try again.");
                console.log(error.response.data);
                this.setState({ redirect: true })
            })
    }


    render() {
        const {classes} = this.props
        const {redirect} = this.state

        if (redirect) {
            console.log("Pls redirect")
            return <Redirect to='/login'/>;
        } else {

            return (

                <div className={"parentDiv"}>
                    <div className="leftBox">
                        <img className="logo" src="https://image.flaticon.com/icons/svg/295/295128.svg"/>

                        <div className={"option"}><Button size='large' color={'secondary'}> Login </Button> <Button
                            size='large' onClick={() => this.props.history.push('/register')}>Register</Button></div>

                        <div className={"informationBox"}>


                            <div className={"TextBox"} type="username">
                                <TextField label={"Username"} className={"textAboveBox"} required
                                           onChange={this.updateInputValue}/>
                            </div>

                            <div className={"TextBox"}>
                                <TextField label="Password" type="password" required
                                           onChange={this.updatePasswordValue}/>
                            </div>

                            <Button onClick={(e) => this.login(e)} variant="raised" color="secondary" size={"large"}>
                                Login
                            </Button>

                        </div>
                    </div>

                    <div className="rightBox">
                        MUIC
                        SCHEDULE
                        MAKER
                    </div>

                </div>

            )
        }
    }
}


export default (Login)