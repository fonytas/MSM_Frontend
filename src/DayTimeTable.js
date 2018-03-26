import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import events from './events'

import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class DayTimeTable extends React.Component {


    render(){
        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
        let formats = {

        };
        const minTime = new Date();
        minTime.setHours(8,0,0);

        const maxTime = new Date();
        maxTime.setHours(21,0,0);

        return (<BigCalendar

            events={events}
            // views={allViews}
            views={['week','agenda']}
            step={30}
            showMultiDayTimes
            defaultView='week'
            defaultDate={new Date()}


            min={ minTime}
            max={ maxTime}
            // formats={formats}


        />)
    }
}