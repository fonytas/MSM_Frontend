import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Schedule from './Schedule';
import OpenSection from './OpenSection'
import Login from './Login'
import registerServiceWorker from './registerServiceWorker';
import {Redirect} from "react-router-dom";



import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import {
    BrowserRouter as Router,
    Route,
    // Link,
    // Redirect,
    // withRouter,
} from 'react-router-dom'


import DayTimeTable from "./DayTimeTable";
import {createMuiTheme} from "material-ui";
import axios from "./AxiosConfig";
// import Login from "./Login";


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#f05545',
            main: '#2f4f4f',
            dark: '#000',
            contrastText: '#f7f3ed',
        },
        secondary: {
            light: '#000',
            main:'#7f0000',
            dark: '#5f0000',
            contrastText: '#f7f3ed'
        },
    }
})


class Mother extends Component{

    constructor(props){
        super(props)
        this.state = {
            coursesA: [],
            coursesB: [],
            coursesC: [],
            plan: 0,
            whoAmI: "",
            // isLogin: false
            redirectIndex: false
        }
    }


    isAuthen = (name) =>{
        // console.log("HI")

        this.setState({whoAmI: name})
        axios.get("/user/getplan")
            .then((response) =>{

                this.setState({coursesA: response.data[0].courses})
                this.setState({coursesB: response.data[1].courses})
                this.setState({coursesC: response.data[2].courses})
            })
            .catch((error) => {
                this.setState({ redirect: true })

            })

    }

    onSetPlan = (plan) => {

        this.setState({plan: plan})
    }
    onAddCourse = (course, val) => {
        console.log("call on add course")
        if (val === 0){
            this.state.coursesA.push(course)

        }
        else if (val ===1){
            this.state.coursesB.push(course)
        }

        else if (val ===2){
            this.state.coursesC.push(course)
        }

    }

    onRemoveCourse = (course) => {
        const removeCourse = (st) => {
            const {[course.id]: omit, ...res} = st.coursesA
            return res
        }
        this.setState(removeCourse)
    }

    render() {

        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/login'/>;
        } else {

            return (
                <div>
                    <Route exact path="/opensection" render={(props) => {
                        return (<OpenSection
                            coursesA={this.state.coursesA}
                            coursesB={this.state.coursesB}
                            coursesC={this.state.coursesC}
                            plan={this.state.plan}
                            whoAmI={this.state.whoAmI}

                            onAddCourse={this.onAddCourse}
                            onRemoveCourse={this.onRemoveCourse}
                            onSetPlan={this.onSetPlan}

                            isAuthen={this.isAuthen}
                        />)
                    }}/>
                    <Route exact path="/Schedule" render={(props) => {
                        return (<Schedule
                            coursesA={this.state.coursesA}
                            coursesB={this.state.coursesB}
                            coursesC={this.state.coursesC}
                            plan={this.state.plan}
                            whoAmI={this.state.whoAmI}


                            onAddCourse={this.onAddCourse}
                            onRemoveCourse={this.onRemoveCourse}
                            onSetPlan={this.onSetPlan}

                            isAuthen={this.isAuthen}

                        />)
                    }}/>

                </div>
            )
        }
    }

}

function MainApp(){
    return (
        <div>
        <MuiThemeProvider theme={theme}>
        <Router>
            <div>
                <Mother/>
                <Route exact path="/register" component={App} />
                <Route exact path="/login" component={Login} />


                <Route exact path ="/DayTimeTable" component = {DayTimeTable}/>




            </div>
        </Router>
        </MuiThemeProvider>
        </div>
    )
}

ReactDOM.render(<MainApp />, document.getElementById('root'));
registerServiceWorker();
