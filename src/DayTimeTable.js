import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import GetEvent from './GetEvent';

import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));



export default function DayTimeTable({DataComponent, Color}) {

    let format = {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'ddd', culture),
    }
    // let color;

    function eventStyle() {

        // var randomColor = require('randomcolor');
        //
        // color = randomColor();

        var style = {
            backgroundColor: Color,
            border: '0.05rem solid #000' ,
            opacity: 0.8,
            color: 'black',
            display: 'block'
        };
        return {
            style: style
        };

    }

    return (


        <BigCalendar

            events={GetEvent(DataComponent) }
            views={['week','agenda']}
            step={30}
            showMultiDayTimes
            defaultView='week'

            defaultDate={new Date("2018-03-25")}

            min={ new Date(new Date().setHours(7,0,0))}
            max={ new Date(new Date().setHours(21,0,0))}

            scrollToTime={new Date()}

            startAccessor='startDate'
            endAccessor='endDate'
            toolbar={false}
            formats={format}
            eventPropGetter={eventStyle}
            

        />)
}

