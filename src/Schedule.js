import React, { Component } from 'react';
import './Schedule.css';
// import Background from '/Users/fonytas/Desktop/project/msm/src/photo/5 Blurred Backgrounds Vol.2/03.jpg';

import {Icon} from 'react-fa';  // http://astronautweb.co/snippet/font-awesome/

import axios from "./AxiosConfig";


// var sectionStyle = {
//     backgroundImage: `url(${Background})`
// };


const Isize = {
    fontSize: '2.1rem'

};

class Schedule extends Component{
    render(){
        return <div className={"Main"}>

            <header className={"Header"}>
                {/*<h>This is header</h>*/}
                <p className="Schedule-title">My Schedule</p>
            </header>

            <div className="Body-S">



                <div className={"S-body"}>

                    <div className={"Left-panel"}>

                        <div className={"Add-course"}>


                            <button><Icon name=" fa-plus-circle" style={Isize}/> <br/>Add Course<br/></button>
                        </div>
                        {/*fa-plus-circle*/}

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

                            {/*<Icon name=" fa-cog" />*/}
                            {/*<p>.. This is Schedule ..</p>*/}
                        </div>





                    </div>




                </div>


            </div>


        </div>
    }
}

export default Schedule;
