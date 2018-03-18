import React, { Component } from 'react';
import { render } from "react-dom";
import _ from "lodash";

import './OpenSection.css';
import Schedule from "./Schedule";

import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeData} from "./Utils";



const rawData = makeData();

const requestData = (pageSize, page, sorted, filtered) => {
    console.log("1");
    return new Promise((resolve, reject) => {
        // You can retrieve your data however you want, in this case, we will just use some local data.
        let filteredData = rawData;

        // You can use the filters in your request, but you are responsible for applying them.
        if (filtered.length) {
            filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                return filteredSoFar.filter(row => {
                    // console.log(row[nextFilter.id] + "").ignoreCase.incl);
                    return (row[nextFilter.id] + "").includes(nextFilter.value);
                });
            }, filteredData);
        }
        // You can also use the sorting in your request, but again, you are responsible for applying it.
        const sortedData = _.orderBy(
            filteredData,
            sorted.map(sort => {
                return row => {
                    if (row[sort.id] === null || row[sort.id] === undefined) {
                        return -Infinity;
                    }
                    return typeof row[sort.id] === "string"
                        ? row[sort.id].toLowerCase()
                        : row[sort.id];
                };
            }),
            sorted.map(d => (d.desc ? "desc" : "asc"))
        );

        // You must return an object containing the rows of the current page, and optionally the total pages number.
        const res = {
            rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
            pages: Math.ceil(filteredData.length / pageSize)
        };

        // Here we'll simulate a server response with 500ms of delay.
        setTimeout(() => resolve(res), 500);
    });
};


const Isize = {
    fontSize: '1.5rem'

};


class OpenSection extends React.Component {

    constructor() {
        console.log("2");
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true,
            firstTime: false
        };
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(state, instance) {
        console.log("3");
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({ loading: true });
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered
        ).then(res => {
            // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
            this.setState({
                data: res.rows,
                pages: res.pages,
                loading: false,

            });
        });

        if (this.state.firstTime == false){
            const rawData = makeData();
            this.state.firstTime = true;

        }
    }


    goBack(e){
        e.preventDefault();
        this.props.history.push("/schedule");
    }

    // {id: "CRS000333 SEC027705", subject: "ICCM104 Intermediate English Communication I 4(4-0-8)", type: "master",
//     section: 2, capacity: 20, time: "Mon 14:00 - 15:50 Wed 14:00 - 15:50", room: 5308, instructor: "Mariejoy ",
//     final: "Thu 21-07-2016 08:00 - 09:50"};
    render() {
        const { data, pages, loading } = this.state;
        return (
            <div>
                <header className={"App-header"}>
                    <div className={"BG"}>
                        <h1 className={"App-title2"}>MUIC Open Section</h1>
                        <a href="#" className="back" onClick={(e) => this.goBack(e)}>
                            <div></div>
                            <h2>Back</h2>
                            <span> Back to Schedule</span>
                        </a>

                    </div>
                    {/*<h1 className={"App-title"}>MUIC Open Section</h1>*/}


                </header>
                <div className={"Table"}>
                <ReactTable  //striped

                    columns={ [
                        {
                            Header: "ID",
                            accessor: "id",
                            // minWidth: 100,
                            maxWidth: 100,
                            style:{ "whiteSpace": "normal"}

                        },
                        {
                            Header: "Subject",
                            accessor: "subject",
                            maxWidth: 500,
                            // id: "lastName",
                            // accessor: d => d.lastName
                            style:{ "whiteSpace": "normal"}
                        },
                        {
                            Header: "Type",
                            accessor: "type",
                            maxWidth:75
                        },
                        {
                            Header: "Section",
                            accessor: "section",
                            maxWidth:75
                        },
                        {
                            Header: "Time",
                            accessor: "time",
                            maxWidth: 126.5,
                            style:{ "whiteSpace": "normal"}
                        },
                        {
                            Header: "Room",
                            accessor: "room",
                            maxWidth:100
                        },
                        {
                            Header: "Instructor",
                            accessor: "instructor",
                            maxWidth: 200
                        },
                        {
                            Header: "Final",
                            accessor: "final",
                            style:{ "whiteSpace": "normal"},
                            maxWidth: 121
                        },
                        {
                            Header: "Remark",
                            accessor: "remark",
                            style:{ "whiteSpace": "normal"},
                            maxWidth: 121
                        },
                        {
                            // Header: "ADD",
                            Cell:(<button className={"AddButton"}>ADD</button>),
                            maxWidth:75,
                        }
                    ]}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={data}
                    pages={pages} // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"

                />
                </div>
                <br />
                {/*<Tips />*/}
                {/*<Logo />*/}
                <footer className={"App-footer"}> </footer>
            </div>
        );
    }
}


export default OpenSection;
