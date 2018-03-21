import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Schedule from './Schedule';
import OpenSection from './OpenSection'
import registerServiceWorker from './registerServiceWorker';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
} from 'react-router-dom'


function MainApp(){
    return (
        <Router>
            <div>
                <Route path="/login" component={App} />
                <Route path = "/schedule" component = {Schedule}/>
                <Route path = "/opensection" component = {OpenSection}/>

                {/*<Route path="/game/:lobID/:name" component={Game} />*/}
                {/*<Route path="/congrats/:lobID/:name" component={Congrats} />*/}
                {/*<Route path="/lobby/:lobID/:name" component={Lobby}/>*/}
            </div>
        </Router>
    )
}

ReactDOM.render(<MainApp />, document.getElementById('root'));
registerServiceWorker();