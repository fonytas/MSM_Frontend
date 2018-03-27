import './OpenSection'
import React from 'react'

export default function GetEvent(DataComponent) {

    const dayInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const dayMap = {"Sun": 25, "Mon":26,"Tue":27, "Wed": 28, "Thu": 29,
        "Fri":30, "Sat": 31}

    let time = []
    var eventList = [
        // {
        //     title: 'foooo',
        //     startDate: new Date(new Date().setHours(10,0,0)),
        //     endDate: new Date(new Date().setHours(12,0,0)),
        // }
    ]


    if (DataComponent != null){
        // console.log("This is IF")
        // let event = {}
        let eachData = DataComponent
        // console.log(eachData)
        Object.keys(eachData).forEach(function (key){

            // console.log(eachData[key].subject);
            time = eachData[key].time.split(" ")

            for (let i =0;i< time.length-3;i++){
                if (dayInWeek.indexOf(time[i]) >= 0){
                    let event = {}
                    let hourStart = Number(time[i+1].split(":")[0])
                    let minuteStart = Number(time[i+1].split(":")[1])

                    let hourEnd = Number(time[i+3].split(":")[0])
                    let minuteEnd = Number(time[i+3].split(":")[1])


                    // console.log(hourStart)
                    event["title"] = eachData[key].subject

                    event["startDate"] = new Date(2018,2,dayMap[time[i]],hourStart,minuteStart,0,0)
                    event["endDate"] = new Date(2018,2,dayMap[time[i]],hourEnd,minuteEnd,0,0)

                    // event["startDate"] = new Date(new Date().setHours(hourStart,minuteStart,0))
                    // event["endDate"] = new Date(new Date().setHours(hourEnd,minuteEnd,0))


                    eventList.push(event)

                }
            }

        });
        // console.log(eventList)
        // console.log(events)
        // console.log(eventList)
        return eventList

    }
    // else {
    //     console.log("This is ELSE")
    return eventList
    // }





}
