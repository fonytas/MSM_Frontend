import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

import {Icon} from 'react-fa';  // http://astronautweb.co/snippet/font-awesome/
import './Schedule.css';
import Page from './Page.js'

import store from './StoreInput';

import axios from "./AxiosConfig";
import urlencode from "form-urlencoded";
import DayTimeTable from "./DayTimeTable";


import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Switch from 'material-ui/Switch';
import Fade from 'material-ui/transitions/Fade';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';



// import { storiesOf } from "@storybook/react";
// import DayTimeTable from "../src/DayTimeTable";

import Typography from 'material-ui/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};





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


function AddButtonBase({history}){
    return <button onClick={() => history.push("/opensection")}><Icon name=" fa-plus-circle" style={Isize}/> <br/>Add Course<br/></button>
}
const AddButton = withRouter(AddButtonBase);


function OnButton({ AddButtonComponent}){
    return (
        <div className={"Add-course"}>
            {AddButtonComponent && <AddButtonComponent/>}
            {/*<AddButtonBase/>*/}
        </div>

    )
}

function HandleName({StateComponent}){

    if (StateComponent === false){
        return <div>Plan A</div>
    }
    return <div>Plan B</div>


}

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,
    },
});




class Schedule extends Component{

    state = {
        checked: false,
        value:0
    };

    handleChange = () => {
        this.setState({ checked: !this.state.checked });
    };

    handleIndex = (event, value) => {
        this.setState({ value:value });
    };


    selectData(){

        axios.get("user/getplan")
            .then((response) =>{
                // console.log(response)
                // console.log(response.data.length == 0)
                console.log(this.props.courses)
                if (response.data.length == 0){
                    return this.props.courses
                }
                else {
                    return response.data

                }


            })

    }



    saveCourse(e, planNumber){
        if (planNumber === false){
            planNumber = 1
        }
        else{
            planNumber = 2
        }

        console.log(planNumber)

        e.preventDefault();
        const dataParams ={
            // courseskyid: this.props.courses,
            planname: planNumber
        };
        // axios.post(`/order_to_kitchen?tablenum=${localStorage.getItem("tableID")}`, cart)
        // axios.post("/user/addCoursesToPlan"+urlencode(dataParams))
        axios.post("/user/addCoursesToPlan"+urlencode(dataParams), this.props.courses)
            .then((response) =>{
                console.log(response)
                // return "success"

            })
            .catch((error) =>{

                console.log(error);
                // return "error"
        })
    }


    render(){
        // const { classes } = this.props;
        const { classes } = this.props;
        const { checked, value } = this.state;
        // const { value } = this.state;

        return (<div className={"Main"}>

            <Page ButtonComponent={LogoutButton} TextComponent={HeaderText}>

            {/*<div className="Body-S">*/}
                {/*<div className={"S-body"}>*/}

                    {/*<div className={classes.root}>*/}
                    {/*<AppBar position="static">*/}
                        {/*<Tabs value={value} onChange={this.handleIndex}>*/}
                            {/*<Tab label="Item One" />*/}
                            {/*<Tab label="Item Two" />*/}
                            {/*<Tab label="Item Three" href="#basic-tabs" />*/}
                        {/*</Tabs>*/}
                    {/*</AppBar>*/}
                    {/*{value === 0 && <TabContainer>Item One</TabContainer>}*/}
                    {/*{value === 1 && <TabContainer>Item Two</TabContainer>}*/}
                    {/*{value === 2 && <TabContainer>Item Three</TabContainer>}*/}
                    {/*</div>*/}

                {/*</div>*/}
            {/*</div>*/}




                <div className={"S-body"}>

                    <div className={"Left-panel"}>

                        <div className={"switch"}>

                            <Switch checked={checked} onChange={this.handleChange} aria-label="collapse" />
                            <HandleName StateComponent={this.state.checked}/>


                        </div>

                        <OnButton AddButtonComponent={AddButton}/>


                        <div className={"Delete-course"}>
                            <button><Icon  name=" fa-times-circle" style={Isize}/><br/>Delete Course<br/></button>
                        </div>


                        <div className={"Save-schedule"}>
                            <button onClick={(e) => this.saveCourse(e, this.state.checked)}><Icon name=" fa-floppy-o" style={Isize}/><br/>Save Schedule<br/></button>
                        </div>



                        <div className={"Delete-Schedule"}>
                            <button onClick ={() => console.log(store.course)}><Icon name=" fa-calendar-minus-o" style={Isize}/><br/>Delete Schedule<br/></button>
                        </div>

                    </div>




                    <Fade in={checked}>
                    <div className={"Mid-panel"}>



                        <div className={"Table"}>
                            <DayTimeTable DataComponent={ this.props.courses}/>
                        </div>
                    </div>
                    </Fade>

                    {/*<Fade in={!checked}>*/}
                        {/*<div className={"Table"}>*/}
                            {/*<DayTimeTable DataComponent={ this.props.courses}/>*/}
                        {/*</div>*/}
                    {/*</Fade>*/}

                </div>
            </Page>
            </div>




        )}
}
Schedule.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default  withStyles(styles)(Schedule);
