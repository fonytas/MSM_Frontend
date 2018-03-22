import React, {Component} from 'react'
import TextField from "material-ui/TextField/TextField";

export default function Textbox({value, onChange, error}){
    return <TextField value={value} onChange={onChange} error={error}/>
}