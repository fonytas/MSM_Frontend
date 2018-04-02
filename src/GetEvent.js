import './OpenSection'
import React from 'react'

export default function GetEvent(DataComponent) {

    const dayInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const dayMap = {"Sun": 25, "Mon":26,"Tue":27, "Wed": 28, "Thu": 29,
        "Fri":30, "Sat": 31}

    let time = []
    let eventList = []


    if (DataComponent != null){
        let eachData = DataComponent
        Object.keys(eachData).forEach(function (key){
            time = eachData[key].time.split(" ")
            for (let i =0;i< time.length-3;i++){
                if (dayInWeek.indexOf(time[i]) >= 0){

                    let event = {}
                    let hourStart = Number(time[i+1].split(":")[0])
                    let minuteStart = Number(time[i+1].split(":")[1])
                    let hourEnd = Number(time[i+3].split(":")[0])
                    let minuteEnd = Number(time[i+3].split(":")[1])

                    // event["title"] = eachData[key].name + " Section:" +eachData[key].section
                    // console.log(eachData[key].name.split(" "))
                    // event["title"] = eachData[key].name.split(" ")[0]  + " : " + eachData[key].skyid

                    event["title"] = eachData[key].skyid + "_______________  " +eachData[key].name.split(" ")
                    event["startDate"] = new Date(2018,2,dayMap[time[i]],hourStart,minuteStart,0,0)
                    event["endDate"] = new Date(2018,2,dayMap[time[i]],hourEnd,minuteEnd,0,0)
                    eventList.push(event)
                }
            }

        });
        return eventList

    }
    return eventList




}
