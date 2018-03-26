import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Schedule from './Schedule';
import OpenSection from './OpenSection'
import registerServiceWorker from './registerServiceWorker';

// import basic from './basic';

import Calender from './Calender';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
} from 'react-router-dom'


import DayTimeTable from "./DayTimeTable";
import {createMuiTheme} from "material-ui";
// import Login from "./Login";


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#f05545',
            main: '#b71c1c',
            dark: '#7f0000',
            contrastText: '#ffffff',
        }
    }
})


class Mother extends Component{
    state = {
        courses: {}
    }

    onAddCourse = (course) => {
        const newCourse = (st) => ({ ...st.courses, [course.id]: course})
        this.setState(newCourse)
    }

    onRemoveCourse = (course) => {
        const removeCourse = (st) => {
            const {[course.id]: omit, ...res} = st.courses
            return res
        }
        this.setState(removeCourse)
    }

    render() {
        return (
            <div>
                <Route exact path = "/schedule" render={(props) => {
                    return (<Schedule
                        courses={this.state.courses}
                        onAddCourse={this.onAddCourse}
                        onRemoveCourse={this.onRemoveCourse}
                    />)
                }}/>
                <Route exact path = "/opensection" render={(props) => {
                    return (<OpenSection
                        courses={this.state.courses}
                        onAddCourse={this.onAddCourse}
                        onRemoveCourse={this.onRemoveCourse}
                    />)
                }}/>
                {/*<Route exact path ="/DayTimeTable" component = {DayTimeTable}/>*/}
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
                <Route exact path="/login" component={App} />
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