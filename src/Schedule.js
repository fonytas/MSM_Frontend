import React, { Component } from 'react';
import {withRouter, Redirect} from "react-router-dom";

import {Icon} from 'react-fa';  // http://astronautweb.co/snippet/font-awesome/
import './Schedule.css';
import axios from "./AxiosConfig";
import DayTimeTable from "./DayTimeTable";

import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Event';
import Toolbar from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import TodoList from './TodoList'


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



const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    avatar: {
        margin: 10,
        color: '#f7f3ed',
        backgroundColor: '#477575'
    },
    icon:{
        fontSize:45,
        marginLeft:12
    }
};

const Isize = {
    fontSize: '2.1rem'

};

var todoItems =[]

var send = []
// var sendA = []
// var sendB = []
// var sendC = []


function Logout({History}){
    axios.post('/logout')
        .then((response) =>{
            History.push("/login")
        })
        .catch((error) =>{
        })
}

function LogoutButtonBase({history}){
    return <Button variant="raised" color="secondary"  onClick={() => Logout({History: history})}>Logout</Button>
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
        </div>)
}


class Schedule extends Component{
    constructor(props){
       super(props);
        this.removeItem = this.removeItem.bind(this);
        // this.deleteCourse = this.deleteCourse.bind(this);

    }

    state = {
        value:0,
        openS: false,
        vertical: null,
        horizontal: null,
        open: false,
        redirect: false,
        open2: false,
    };


    componentDidMount(){

        axios.get("/user/whoami")
            .then((response) =>{

                this.props.isAuthen(response.data.user.substring(0,1).toUpperCase())
            }).catch((error) => {
                this.setState({ redirect: true })
        })


    }

    removeItem (itemIndex) {

        this.props.onSetRemove()

        todoItems.splice(itemIndex, 1);
        this.setState({todoItems: todoItems});

        send.splice(itemIndex, 1);
        console.log(send)
        this.props.setTodo(send,this.state.value)



    }




    handleClickOpen2 = (val) => {
        this.setState({ open2: true });
        this.deleteCourse(val)
        // this.props.createItem

    };

    handleClose2 = () => {
        this.setState({ open2: false });
    };

    handleIndex = (event, value) => {
        console.log("Handle")
        this.setState({ value:value });
        this.props.onSetPlan(value)
        todoItems = []
        send = []
        // this.props.setZero

    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleClickS = state => () => {
        this.setState({ openS: true, ...state });
        this.props.saveCourse(this.state.value)
    };

    handleCloseS = () => {
        this.setState({ openS: false });
    };


    deleteCourse(val) {

        let data;

        if (val === 0){
            data = this.props.coursesA.concat(this.props.temporaryCourseA)
        }
        else if (val ===1){
            data = this.props.coursesB.concat(this.props.temporaryCourseB)
        }
        else if (val === 2){
            data = this.props.coursesC.concat(this.props.temporaryCourseC)

        }

        // console.log(data)
        data.forEach(function (element) {

            var dataSky = element.skyid

            var count = 0;

            if (todoItems.length ===0){
                // console.log("HI")
                todoItems.push({index: 1, value: dataSky, done: false})
                send.push(element)
            }
            else{

                todoItems.forEach(function (each) {
                    if (each.value === dataSky){
                        count=1;
                    }

                })

                if (count!==1){
                    todoItems.push({index: 1, value: dataSky, done: false})
                    send.push(element)

                }

            }

        })

        // console.log("GG")
        // console.log(send)
        // console.log(todoItems)
        // this.setState({send: send, todoItems:todoItems})


    }

    handleDelete(){
        //
        // console.log(send)
        // console.log(todoItems)

        this.handleClose2()
        this.props.onDeleteCourse(this.state.value)

    }




    deleteSchedule(){

        // e.preventDefault();
        axios.post(`/user/removeAllCoursesFromPlan?planname=${this.state.value+1}`)
            .then((response) =>{
            })
            .catch((error) =>{
            })
    }


    render() {

        const {classes} = this.props;
        const {value, vertical, horizontal, openS, redirect} = this.state;
        // console.log(this.props.coursesA)


        if (redirect) {
            console.log("redirect")
            return <Redirect to='/login'/>;
        } else {
            // console.log(this.props.coursesA)


            return (<div className={"Main"}>


                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="default" aria-label="Menu">
                                <MenuIcon className={classes.icon}/>
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Schedule
                            </Typography>
                            <Avatar className={classes.avatar}>{this.props.whoAmI}</Avatar>
                            <LogoutButton/>
                        </Toolbar>
                    </AppBar>



                    {/*<div>*/}



                    <div className={"Left-panel"}>

                        <OnButton AddButtonComponent={AddButton}/>


                        <div className={"Delete-course"}>
                            <button onClick={ () =>  this.handleClickOpen2(this.state.value) }><Icon name=" fa-times-circle" style={Isize}/><br/>Delete Course<br/></button>

                            <Dialog
                                open={this.state.open2}
                                onClose={this.handleClose2}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"What course do you want to Delete ?"}</DialogTitle>
                                <DialogContent>


                                    <div id="main">
                                        <TodoList items={todoItems}
                                                  removeItem={this.removeItem}
                                        />
                                    </div>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose2} color="primary">
                                        Dismiss
                                    </Button>
                                    <Button onClick={() => this.handleDelete()} color="primary" autoFocus>
                                        Done
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>


                        <div className={"Save-schedule"}>
                            <button onClick={this.handleClickS({vertical: 'top', horizontal: 'center'})}><Icon
                                name=" fa-floppy-o" style={Isize}/><br/>Save Schedule<br/></button>

                        </div>


                        <div className={"Delete-Schedule"}>
                            <button onClick={this.handleClickOpen}><Icon name=" fa-calendar-minus-o"
                                                                         style={Isize}/><br/>Delete Schedule<br/>
                            </button>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle
                                    id="alert-dialog-title">{"Do you want to DELETE the schedule ? "}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        This action cannot be undo
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Dismiss
                                    </Button>
                                    <Button onClick={() => this.deleteSchedule()} color="secondary" autoFocus>
                                        DELETE
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>

                    <div className={"Mid-panel"}>
                        <div className={classes.root}>
                            <AppBar position="static">
                                <Tabs value={value} onChange={this.handleIndex} centered>
                                    <Tab label="Plan A"/>
                                    <Tab label="Plan B"/>
                                    <Tab label="Plan C" href="#basic-tabs"/>
                                </Tabs>
                            </AppBar>

                            {value === 0 &&
                            <TabContainer>
                                <div className={"Table"}>
                                    <DayTimeTable DataComponent={this.props.coursesA.concat(this.props.temporaryCourseA)} Color={this.props.isColor}/>
                                </div>
                            </TabContainer>}
                            {value === 1 &&
                            <TabContainer>

                                {/*<div id="main">*/}
                                    {/*<TodoList items={todoItems}*/}
                                              {/*removeItem={this.removeItem}*/}
                                    {/*/>*/}
                                {/*</div>*/}

                                <div className={"Table"}>
                                    <DayTimeTable DataComponent={this.props.coursesB.concat(this.props.temporaryCourseB)} Color={this.props.isColor}/>
                                </div>

                            </TabContainer>}
                            {value === 2 &&
                            <TabContainer>

                                <div className={"Table"}>
                                    <DayTimeTable DataComponent={this.props.coursesC.concat(this.props.temporaryCourseC)} Color={this.props.isColor} />
                                    {/*<GetPlan Value={this.state.value} Pro={this.props.coursesA}/>*/}
                                </div>

                            </TabContainer>}
                        </div>
                    </div>
                    <Snackbar
                        anchorOrigin={{vertical, horizontal}}
                        open={openS}
                        onClose={this.handleCloseS}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Saved</span>}
                    />

                </div>


            )
        }
    }
}
Schedule.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(Schedule);
