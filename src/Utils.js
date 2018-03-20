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

const newPerson = (data) => {
    return {

        id: data.courseSkyID,
        subject: data.courseName,
        type: data.courseType,
        section: data.courseSection,
        capacity: data.courseCapacity,
        time: data.courseTime,
        room: data.courseRoom,
        instructor: data.courseInstructor,
        final: data.courseFinal,
        remark: data.remark
    };
};



export function makeData(allData) {
    // console.log(">>>"+num);
    // nn = num;
    mapData = allData;
    // console.log(mapData[0].courseSkyID);


    // console.log(mapData);
    return Object.keys(mapData).map((key, index) => {

        return {
            ...newPerson(mapData[key]),
            children: range(10).map(newPerson)
        };
    });
}


export const Tips = () =>
    <div style={{ textAlign: "center" }}>
        {/*<em>Tip: Hold shift when sorting to multi-sort!</em>*/}
    </div>;
