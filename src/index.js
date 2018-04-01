import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Schedule from './Schedule';
import OpenSection from './OpenSection'
import Login from './Login'
import registerServiceWorker from './registerServiceWorker';

// import basic from './basic';

// import Calender from './Calender';

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
            coursesC: []
        }



    }


    //
    // onGetCourse (){
    //     // console.log("HELLO")
    //     console.log(this.state.coursesA)
    //
    // }

    onAddCourse = (course) => {
        console.log("call on add course")


        this.state.coursesA.push(course)
    }

    onRemoveCourse = (course) => {
        const removeCourse = (st) => {
            const {[course.id]: omit, ...res} = st.coursesA
            return res
        }
        this.setState(removeCourse)
    }

    render() {

        // console.log(this.state.courses)
        return (
            <div>
                <Route exact path = "/opensection" render={(props) => {
                    return (<OpenSection
                        coursesA={this.state.coursesA}

                        onAddCourse={this.onAddCourse}
                        onRemoveCourse={this.onRemoveCourse}
                        // onGetCourse = {this.onGetCourse}
                    />)
                }}/>
                <Route exact path = "/Schedule" render={(props) => {
                    return (<Schedule
                        coursesA={this.state.coursesA}
                        onAddCourse={this.onAddCourse}
                        onRemoveCourse={this.onRemoveCourse}
                        // onGetCourse = {this.onGetCourse}
                    />)
                }}/>

            </div>
        )
    }

}

function MainApp(){
    return (
        <div>
        <MuiThemeProvider theme={theme}>
        <Router>
            <div>
                <Route exact path="/register" component={App} />
                <Route exact path="/login" component={Login} />

                <Mother/>
                {/*<Route exact path = "/schedule" component = {Schedule}/>*/}
                {/*<Route exact path = "/opensection" component = {OpenSection}/>*/}
                {/*/!*<Route exact path = "/test" component={Test}/>*!/*/}

                <Route exact path ="/DayTimeTable" component = {DayTimeTable}/>


                {/*<Route exact path="/main" component={Main} />*/}



            </div>
        </Router>
        </MuiThemeProvider>
        </div>
    )
}

ReactDOM.render(<MainApp />, document.getElementById('root'));
registerServiceWorker();



{/*<Route path="/game/:lobID/:name" component={Game} />*/}
{/*<Route path="/congrats/:lobID/:name" component={Congrats} />*/}
{/*<Route path="/lobby/:lobID/:name" component={Lobby}/>*/}