import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import axios from "./AxiosConfig";

// import Background from '/Users/fonytas/Desktop/project/msm/src/photo/cloud.jpg';
//
// var sectionStyle = {
//     // width: "100%",
//     // height: "200px",
//     backgroundImage: `url(${Background})`
// };


// localhost:{port}/user/register/{username}/{email}/{password}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {userName:"Anonymous", email:"none@sth.com",password: "None",ccPassword: "None",logClass: "login-form", regClass: "login-form",regform: false, logform: true,active: 0};
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);
        this.updateccPasswordValue = this.updateccPasswordValue.bind(this);
        this.updateEmailValue = this.updateEmailValue.bind(this);


    }

    updateInputValue(evt){
        this.setState({userName: evt.target.value});
        // console.log(this.state.userName);
    }

    updateEmailValue(evt){
        this.setState({email: evt.target.value});
        // console.log(this.state.userName);
    }
    updatePasswordValue(evt){
        this.setState({password: evt.target.value});
    }
    updateccPasswordValue(evt){
        this.setState({ccPassword: evt.target.value});
    }

    // localhost:{port}/user/register/{username}/{email}/{password}


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
                if(response.data.nameStatus ==="valid"){
                    this.props.history.push("/Schedule/"+this.state.userName);
                }
                else{
                    alert("Username already exists")
                }

            }).catch(function (error){
                console.log(error);
            });
        }
    }

    componentDidUpdate(){

        if(this.state.logform && window.location.href.indexOf("#register-form") !== -1  ){
            this.setState({regClass: "register-form show", logform: false, regform: true, active: this.state.active+1})
        }
        else if (this.state.regform && window.location.href.indexOf("#login-form") !== -1 ){
            this.setState({regClass: "register-form", logform: true, regform: false,active: this.state.active+1})
        }


    }
    login(e){
        e.preventDefault();
        this.props.history.push("/schedule")

    }

    componentDidMount(){

        // console.log("component did mount");
        // console.log(this.state.regClass);
        // console.log(this.state.active);
        document.body.style.overflow = "hidden"
    }

    render() {
        // if(this.state.active === 0 &&this.state.logform && window.location.href.indexOf("#register-form") !== -1 ){
        //     this.setState({regClass: "register-form show", logform: false, regform: true, active: this.state.active+1})
        // }
        return (
          <div className="App">

              <header className={"App-header"}>
                  <h1 className={"App-title"}>MUIC Schedule Maker</h1>
              </header>

              <div className ="App-body">
                  {/*<header className={"Header-form"}></header>*/}

                  <div className="form">


                      <form id="login-form" className={this.state.regClass}>

                          <div className="Signin">Register</div>
                          <input type="text" placeholder="Username" required  onChange={this.updateInputValue} />
                          <input type="text" placeholder="Email" required  onChange={this.updateEmailValue} />
                          <input type="password" placeholder="Password" required onChange={this.updatePasswordValue}/>
                          <input type="password" placeholder="Confirm password" required onChange={this.updateccPasswordValue}/>
                          <button onClick ={ (e) => this.registerInfo(e)}>create</button>
                          <p className="message">Already registered? <a href={"#login-form"}>Sign In</a></p>
                      </form>


                      <form id="register-form" className={this.state.logClass}>

                          <div className="Signin">Sign In</div>
                          <input type="text" placeholder="Username" required/>
                          <input type="password" placeholder="Password" required/>
                          <button onClick={(e) => this.login(e) }>login</button>

                          <p className="message">Not registered? <a href={"#register-form"}>Create an account</a></p>

                      </form>

                  </div>
              </div>

              <footer className={"App-footer"}></footer>

          </div>
        );
      }
}

export default App;
