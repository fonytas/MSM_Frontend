import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Schedule from './Schedule';
import OpenSection from './OpenSection'
import registerServiceWorker from './registerServiceWorker';
// import basic from './basic';

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

function MainApp(){
    return (
        <div>
        <MuiThemeProvider theme={theme}>
        <Router>
            <div>
                <Route exact path="/login" component={App} />
                <Route exact path = "/schedule" component = {Schedule}/>
                <Route exact path = "/opensection" component = {OpenSection}/>
                {/*<Route exact path = "/test" component={Test}/>*/}

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