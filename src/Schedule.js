import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

import {Icon} from 'react-fa';  // http://astronautweb.co/snippet/font-awesome/

import './Schedule.css';
import Page from './Page.js'



const Isize = {
    fontSize: '2.1rem'

};


function HeaderText(){
    return <h1 className={"App-title2"}>My Schedule</h1>
}

function LogoutButtonBase({history}){
    return <button className="logout" onClick={() => history.push("/login#login-form")} >
        Logout
    </button>
}
const LogoutButton = withRouter(LogoutButtonBase);



class Schedule extends Component{

    goTo(e){
        e.preventDefault();
        this.props.history.push("/opensection");
    }

    render(){
        return (<div className={"Main"}>

            <Page ButtonComponent={LogoutButton} TextComponent={HeaderText}>

            <div className="Body-S">

                <div className={"S-body"}>

                    <div className={"Left-panel"}>

                        <div className={"Add-course"}>

                            <button onClick={(e) => this.goTo(e)}><Icon name=" fa-plus-circle" style={Isize}/> <br/>Add Course<br/></button>
                        </div>

                        <div className={"Delete-course"}>
                            <button><Icon name=" fa-times-circle" style={Isize}/><br/>Delete Course<br/></button>
                        </div>


                        <div className={"Save-schedule"}>
                            <button><Icon name=" fa-floppy-o" style={Isize}/><br/>Save Schedule<br/></button>
                        </div>



                        <div className={"New-Schedule"}>
                            <button><Icon name=" fa-calendar-plus-o" style={Isize}/><br/>New Schedule<br/></button>
                        </div>

                        <div className={"Delete-Schedule"}>
                            <button><Icon name=" fa-calendar-minus-o" style={Isize}/><br/>Delete Schedule<br/></button>
                        </div>

                    </div>

                    <div className={"Right-panel"}>

                        <div className={"Box"}>Subject 1</div>
                        <div className={"Box"}>Subject 2</div>
                        <div className={"Box"}>Subject 3</div>
                        <div className={"Box"}>Subject 4</div>
                        <div className={"Box"}>Subject 5</div>
                        <div className={"Box"}>Subject 6</div>
                        <div className={"Box"}>Subject 7</div>
                        <div className={"Box"}>Subject 8</div>
                        <div className={"Box"}>Subject 9</div>
                        <div className={"Box"}>Subject 10</div>


                    </div>

                    <div className={"Mid-panel"}>

                        <div className={"Table"}>

                        </div>
                    </div>
                </div>
            </div>
            </Page>



        </div>
        )}
}

export default Schedule;
