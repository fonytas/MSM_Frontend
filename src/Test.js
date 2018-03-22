import React, {Component} from 'react'
import Textbox from "./Textbox";

export default class Test extends Component{
    state = {
        box1: '',
        box2: ''
    };

    handleChange = (name) => (e) => {
        this.setState({[name]: e.target.value})
    };

    // handleBox1 = (e) => {
    //     this.setState({'box1': e.target.value})
    // }
    //
    // handleBox2 = (e) => {
    //     this.setState({'box1': e.target.value})
    // }


    render() {
        const {box1, box2} = this.state
        const error = box1!=box2
        return (
            <div>
                <Textbox value={box1} onChange={this.handleChange('box1')} error={error}/>
                <br/>
                <Textbox value={box2} onChange={this.handleChange('box2')} error={error}/>
            </div>
        )
    }
}