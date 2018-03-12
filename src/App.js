import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// import axios from "./AxiosConfig";

// import Background from '/Users/fonytas/Desktop/project/msm/src/photo/cloud.jpg';
//
// var sectionStyle = {
//     // width: "100%",
//     // height: "200px",
//     backgroundImage: `url(${Background})`
// };



class App extends Component {
    constructor(props){
        super(props);
        this.state = {logClass: "login-form", regClass: "login-form",regform: false, logform: true,active: 0}

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
                          <input type="text" placeholder="Username" />
                          <input type="password" placeholder="Password"/>
                          <input type="text" placeholder="Confirm password"/>
                          <button>create</button>
                          <p className="message">Already registered? <a href={"#login-form"}>Sign In</a></p>
                      </form>


                      <form id="register-form" className={this.state.logClass}>

                          <div className="Signin">Sign In</div>
                          <input type="text" placeholder="Username" />
                          <input type="password" placeholder="Password"/>
                          <button >login</button>

                          <p className="message">Not registered? <a href={"#register-form"}>Create an account</a></p>

                      </form>

                  </div>
              </div>

          </div>
        );
      }
}

export default App;
