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
} from 'react-router-dom'


import DayTimeTable from "./DayTimeTable";
import {createMuiTheme} from "material-ui";
import axios from "./AxiosConfig";
import Admin from "./Admin";

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
            redirect: false,
            temporaryCourseA: [],
            temporaryCourseB: [],
            temporaryCourseC: [],
            todo:[],
            isRemove:false,
            isColor: ""

        }
    }

    isAuthen = (name) =>{
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


    saveCourse = (value) => {
        let data ;

        if (value === 0){
            data = this.state.coursesA.concat(this.state.temporaryCourseA)
        }
        else if (value === 1) {
            data = this.state.coursesB.concat(this.state.temporaryCourseB)
        }
        else if (value === 2){
            data = this.state.coursesC.concat(this.state.temporaryCourseC)
        }

        axios.post(`/user/saveCoursesToPlan?planname=${value+1}`, data)
            .then((response) =>{
            })
            .catch((error) =>{
            })
    }


    onSetPlan = (plan) => {
        this.setState({plan: plan})
    }
    onAddCourse = (course, val) => {

        if (val === 0){
            this.state.temporaryCourseA.push(course)
        }
        else if (val ===1){
            this.state.temporaryCourseB.push(course)
        }
        else if (val ===2){
            this.state.temporaryCourseC.push(course)
        }


    }
    setTodo= (todo,val) =>{
        this.setState({todo: todo})
    }

    changeColor = () =>{
        var randomColor = require('randomcolor');
        this.setState({isColor: randomColor()})
    }
    
    onSetRemove = () => {
        this.setState({isRemove:true})
    }
    onDeleteCourse = (val) => {

        if (this.state.todo.length !== 0){
            if (val === 0){
                this.setState({coursesA: []})
                this.setState({temporaryCourseA: this.state.todo})

            }
            else if (val === 1){
                this.setState({coursesB: []})
                this.setState({temporaryCourseB: this.state.todo})
            }
            else if (val === 2){
                this.setState({coursesC: []})
                this.setState({temporaryCourseC: this.state.todo})
            }

        }
        else if (this.state.isRemove){

            if (val === 0){
                this.setState({coursesA: []})
                this.setState({temporaryCourseA: []})

            }
            else if (val === 1){
                this.setState({coursesB: []})
                this.setState({temporaryCourseB: []})
            }
            else if (val === 2){
                this.setState({coursesC: []})
                this.setState({temporaryCourseC:[]})
            }

        }

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
                            temporaryCourseA={this.state.temporaryCourseA}
                            temporaryCourseB={this.state.temporaryCourseB}
                            temporaryCourseC={this.state.temporaryCourseC}
                            onAddCourse={this.onAddCourse}
                            onSetPlan={this.onSetPlan}
                            isAuthen={this.isAuthen}
                            isColor={this.state.isColor}
                            changeColor={this.changeColor}
                        />)
                    }}/>


                    <Route exact path="/Schedule" render={(props) => {
                        return (<Schedule
                            coursesA={this.state.coursesA}
                            coursesB={this.state.coursesB}
                            coursesC={this.state.coursesC}
                            plan={this.state.plan}
                            whoAmI={this.state.whoAmI}
                            temporaryCourseA={this.state.temporaryCourseA}
                            temporaryCourseB={this.state.temporaryCourseB}
                            temporaryCourseC={this.state.temporaryCourseC}
                            setTodo={this.setTodo}

                            onDeleteCourse={this.onDeleteCourse}

                            todo={this.state.todo}
                            isRemove={this.state.remove}
                            onSetRemove={this.onSetRemove}
                            onAddCourse={this.onAddCourse}
                            onSetPlan={this.onSetPlan}
                            saveCourse = {this.saveCourse}
                            isAuthen={this.isAuthen}
                            isColor={this.state.isColor}

                        />)
                    }}/>
                </div>
            )}}
}

function MainApp(){
    return (
        <div>
        <MuiThemeProvider theme={theme}>
        <Router>
            <div>
                <Mother/>
                <Route exact path="/register" component={App} />
                <Route exact path="/" component={Login} />
                <Route exact path ="/DayTimeTable" component={DayTimeTable}/>
                <Route exact path="/admin" component={Admin} />
            </div>
        </Router>
        </MuiThemeProvider>
        </div>
    )
}

ReactDOM.render(<MainApp />, document.getElementById('root'));
registerServiceWorker();
