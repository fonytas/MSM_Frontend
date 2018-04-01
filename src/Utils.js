import React from "react";
import "./index.css";


const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};


var mapData = {};

const newSubject = (data) => {
    return {

        skyid: data.skyid,
        name: data.name,
        type: data.type,
        section: data.section,
        capacity: data.capacity,
        time: data.time,
        room: data.room,
        instructor: data.instructor,
        final: data.finaltime,
        remark: data.remark,
        courseid: data.courseid
    };
};


export function makeData(allData) {

    mapData = allData;


    return Object.keys(mapData).map((key, index) => {

        return {
            ...newSubject(mapData[key]),
            // children: range(10).map(newSubject)
        };
    });
}


