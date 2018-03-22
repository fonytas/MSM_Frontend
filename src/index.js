import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Schedule from './Schedule';
import OpenSection from './OpenSection'
import registerServiceWorker from './registerServiceWorker';
import Test from './Test'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import Main from './Main'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
} from 'react-router-dom'
import DayTimeTable from "./DayTimeTable";
// import Login from "./Login";


function MainApp(){
    return (
        <div>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router>
            <div>
                <Route exact path="/login" component={App} />
                <Route exact path = "/schedule" component = {Schedule}/>
                <Route exact path = "/opensection" component = {OpenSection}/>
                <Route exact path = "/test" component={Test}/>

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