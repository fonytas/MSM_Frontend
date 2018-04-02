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

function checkExistence(todo, ele){


    for (let i=0; i < todo.length; i++){

        if (todo[i].value === ele){
            return true
        }else{
            return false
        }
    }

}


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
        console.log("Saved !")
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

        console.log("call on add course")
        // console.log(this.state.coursesA.length)

        if (val === 0){
            this.state.temporaryCourseA.push(course)
            // this.state.coursesA.push(course)
            // this.state.todoA.push(course)
        }
        else if (val ===1){
            this.state.temporaryCourseB.push(course)
            // this.state.coursesB.push(course)
            // this.state.todoB.push(course)
        }

        else if (val ===2){

            this.state.temporaryCourseC.push(course)
            // this.state.coursesC.push(course)
            // this.state.todoA.push(course)
        }

        // console.log(this.state.coursesA)


    }
    setTodo= (todo,val) =>{

        this.setState({todo: todo})

    }

    changeColor = () =>{
        var randomColor = require('randomcolor');
        // let color = randomColor();

        this.setState({isColor: randomColor()})
    }
    
    onSetRemove = () => {
        this.setState({isRemove:true})
    }
    onDeleteCourse = (val) => {

        // console.log(val)
        console.log(this.state.todo)

        if (this.state.todo.length !== 0){
            // console.log("1")
            if (val === 0){
                // console.log("2")
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
                // console.log("2")
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

        // else{
        //
        //     if (val === 0){
        //         // console.log("2")
        //         this.setState({coursesA: []})
        //         this.setState({temporaryCourseA: this.state.todo})
        //
        //     }
        //     else if (val === 1){
        //         this.setState({coursesB: []})
        //         this.setState({temporaryCourseB: this.state.todo})
        //     }
        //     else if (val === 2){
        //         this.setState({coursesC: []})
        //         this.setState({temporaryCourseC: this.state.todo})
        //
        //
        // }

        // else {
            // if (val === 0){
            //     // console.log("2")
            //     this.setState({coursesA: []})
            //     this.setState({temporaryCourseA: this.state.todo})
            //
            // }
            // else if (val === 1){
            //     this.setState({coursesB: []})
            //     this.setState({temporaryCourseB: this.state.todo})
            // }
            // else if (val === 2){
            //     this.setState({coursesC: []})
            //     this.setState({temporaryCourseC: this.state.todo})
            // }

        // }




        // if (this.state.todo.length !== 0){


        // }
        // this.setState({coursesA: []})
        // this.setState({temporaryCourseA: this.state.todo})

        // this.saveCourse()
        // window.location.reload();


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
                            onRemoveCourse={this.onRemoveCourse}
                            onSetPlan={this.onSetPlan}
                            saveCourse = {this.saveCourse}

                            createItem={this.createItem}

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

                            setZero={this.setZero}
                            createItem={this.createItem}

                            onAddCourse={this.onAddCourse}
                            onRemoveCourse={this.onRemoveCourse}
                            onSetPlan={this.onSetPlan}
                            saveCourse = {this.saveCourse}

                            isAuthen={this.isAuthen}
                            isColor={this.state.isColor}

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
