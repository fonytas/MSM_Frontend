import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
export default class Calender extends React.Component {

    render(){
        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
        return (<BigCalendar
            events={[]}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
        />)
    }
}