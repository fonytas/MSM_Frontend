import React, { Component } from 'react';
import axios from "./AxiosConfig";
import urlencode from 'form-urlencoded';


import './App.css';
import Page from "./Page";
import {AppBar, Avatar, IconButton, Toolbar, Typography} from "material-ui/index";
import {deepOrange, withStyles} from "material-ui";


function HeaderText(){
    return <h1 className={"App-title2"}>MUIC Schedule Maker</h1>
}


function TopBar(props){
    const { classes } = props;

    return  (
        <AppBar position="static"  >
            <Toolbar >
                <Typography variant="title" color="inherit">
                    MUIC Schedule Maker
                </Typography>

            </Toolbar>
        </AppBar>
    )
}





class App extends Component {
    constructor(props){


        super(props);
        this.state = {userName:"Anonymous", email:"none@sth.com",password: "None",
                    ccPassword: "None",logClass: "login-form", regClass: "login-form",regform: false, logform: true,active: 0,
                    error: false};
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
        if(this.state.password.length < 6){
            e.preventDefault();
            alert("Password must be more than 6 letters");
        }
        if (this.state.password !== this.state.ccPassword){
            e.preventDefault();
            alert("Password mismatch");
        }
        else{
            e.preventDefault();
            console.log(">> username : " + this.state.userName);

            var js = axios.post("/user/register/" + this.state.userName + "/" +this.state.email+"/" +this.state.password);
            js.then((response)=>{
                if(response.data.nameStatus === "valid"){
                    this.props.history.push("/Schedule/"+this.state.userName);
                }
                else{
                    alert("Username already exists")
                }

            }).catch(function (error){
                console.log(error);
            });
            this.props.history.push('/login');
        }
    }


    login(e){
        e.preventDefault();

        const loginParams = {
            username: this.state.userName,
            password: this.state.password
        };

        axios.post("/login", urlencode(loginParams))
            .then((response) => {

                console.log(response.data.login);
                if (response.data.login === true){

                    this.props.history.push('/Schedule');
                }
            })
            .catch((error) => {
                alert("Username or Password are incorrect, Please try again.");
                console.log(error.response.data);
            })
    }


    componentDidUpdate(){

        if(this.state.logform && window.location.href.indexOf("#register-form") !== -1  ){
            this.setState({regClass: "register-form show", logform: false, regform: true, active: this.state.active+1})
        }
        else if (this.state.regform && window.location.href.indexOf("#login-form") !== -1 ){
            this.setState({regClass: "register-form", logform: true, regform: false,active: this.state.active+1})
        }

    }


    componentDidMount(){
        document.body.style.overflow = "hidden"
    }





    render() {

        return (
            <div className="App">

                <Page TextComponent={HeaderText}>

                    <div className ="App-body">

                        <div className="form">


                            <form id="login-form" className={this.state.regClass}>

                                <div className="Signin">Register</div>

                                <input  type="text" placeholder="Username" required  onChange={this.updateInputValue} />

                                <input type="email" placeholder="Email" required  onChange={this.updateEmailValue} />
                                <input type="password" placeholder="Password" required onChange={this.updatePasswordValue}/>
                                <input type="password" placeholder="Confirm password" required onChange={this.updateccPasswordValue}/>
                                <button onClick ={ (e) => this.registerInfo(e)}>create</button>
                                <p className="message">Already registered? <a href={"#login-form"}>Sign In</a></p>
                            </form>


                            <form id="register-form" className={this.state.logClass}>

                                <div className="Signin">Sign In</div>
                                <input type="text" placeholder="Username" required onChange={this.updateInputValue}/>
                                <input type="password" placeholder="Password" required onChange={this.updatePasswordValue} />
                                <button onClick={(e) => this.login(e) }>login</button>

                                <p className="message">Not registered? <a href={"#register-form"}>Create an account</a></p>

                            </form>

                        </div>
                    </div>
                </Page>

            </div>

        );
      }
}

export default (App);
