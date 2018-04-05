import React, { Component } from 'react';
import axios from "./AxiosConfig";
import urlencode from 'form-urlencoded';
import './App.css';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import isEmail from 'validator/lib/isEmail';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {userName:"", email:"",password: "",
                    ccPassword: ""}
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);
        this.updateccPasswordValue = this.updateccPasswordValue.bind(this);
        this.updateEmailValue = this.updateEmailValue.bind(this);
    }

    updateInputValue(evt){
        this.setState({userName: evt.target.value});
    }
    updateEmailValue(evt){
        this.setState({email: evt.target.value});
    }
    updatePasswordValue(evt){
        this.setState({password: evt.target.value});
    }
    updateccPasswordValue(evt){
        this.setState({ccPassword: evt.target.value});
    }

    registerInfo(e){


        e.preventDefault();

        if (this.state.userName.length < 4 && this.state.userName.length > 10){
            alert("Username must be between 4 to 6 letters");

        }
        if(this.state.password.length < 6){
            alert("Password must be more than 6 letters");
        }
        if (this.state.password !== this.state.ccPassword){
            alert("Password mismatch");
        }
        if (!isEmail(this.state.email)){
            alert("Please put the valid Email");
        }
        else{
            const regisParams ={
                username: this.state.userName,
                password: this.state.password,
                email: this.state.email
            };
            axios.post("/user/register",urlencode(regisParams))
                .then((response) =>{
                    this.props.history.push('/')
                })
                .catch((error) =>{
                });
        }
    }

    render() {


        return (
            <div className={"parentDiv"}>
                <div className="leftBox">
                    <img className="logo" src="https://image.flaticon.com/icons/svg/295/295128.svg" />
                    <div className={"option"}><Button size='large'onClick={ () => this.props.history.push('/')}>Login</Button><Button size='large'color={"secondary"}>Register</Button></div>
                    <div className={"informationBox2"}>
                    <div className={"TextBox"}>
                        <TextField  label={"Username"} className={"textAboveBox"} required  onChange={this.updateInputValue} />
                    </div>
                    <div className="TextBox">
                        <TextField label={"Email"} className={"textAboveBox"} required  onChange={this.updateEmailValue} />
                    </div>
                    <div className={"TextBox"}>
                        <TextField  label="Password" type="password" required onChange={this.updatePasswordValue}/>
                    </div>
                    <div className={"TextBox"}>
                        <TextField  label="Confirm Password" type="password" required onChange={this.updateccPasswordValue}/>
                    </div>
                    <Button variant="raised" color="secondary" size={"large"} onClick ={ (e) => this.registerInfo(e)}>
                        Create
                    </Button>
                    </div>
                </div>

                <div className="rightBox">
                    MUIC
                    SCHEDULE
                    MAKER
                </div>

            </div>)

    }
}

export default (App);
