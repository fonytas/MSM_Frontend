import React from 'react';
import ReactTable from "react-table";
import {withRouter} from "react-router-dom";
import _ from "lodash";
import axios from "./AxiosConfig";
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import './OpenSection.css';
import "react-table/react-table.css";
import Page from './Page.js'
import {makeData} from "./Utils";
import urlencode from "form-urlencoded";

import store from './StoreInput';



export function fetchLocals() {

    const request = axios.post('course/findall')
        .then(function(response) {
            return response.data;
        })
        .catch(function (error) {
            return Promise.reject(error);
        });

    return {
        // type: GET_LOCATIONS,
        payload: request
    };
}


const requestData = (pageSize, page, sorted, filtered) => {

    return new Promise((resolve, reject) => {

        fetchLocals().payload
            .then(data => {


                let filteredData = makeData(data);
                if (filtered.length) {
                    filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                        return filteredSoFar.filter(row => {
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
    });
};



function MyTable({onRowClick, ...props}){

    return  (<ReactTable  //striped

        columns={ [
            {
                Header: "ID",
                accessor: "skyid",
                maxWidth: 100,
                style:{ "whiteSpace": "normal"}

            },
            {
                Header: "Subject",
                accessor: "name",
                maxWidth: 400,

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
                maxWidth:50
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
                maxWidth:60,
                style:{ "whiteSpace": "normal"}
            },
            {
                Header: "Instructor",
                accessor: "instructor",
                maxWidth: 140,
                style:{ "whiteSpace": "normal"}
            },
            {
                Header: "Final",
                accessor: "final",
                style:{ "whiteSpace": "normal"},
                maxWidth: 200,
                // Cell: <Button onClick={(e) =>{ e.stopPropagation()}} variant={"fab"}  mini color="secondary" aria-label="add" >
                //     <AddIcon /></Button>,
            },
            {
                Header: "Remark",
                accessor: "remark",
                style:{ "whiteSpace": "normal"},
                maxWidth: 140,
                // Cell: <Button onClick={(e) =>{ e.stopPropagation()}} variant={"fab"}  mini color="secondary" aria-label="add" >
                //     <AddIcon /></Button>,

            },
            {
                filterable:false,
                style: {"margin": "5px 0px 0px 10px"},

                Cell: <Button onClick={(e) =>{ }} variant={"fab"}  mini color="secondary" aria-label="add" >
                    <AddIcon /></Button>,

                maxWidth:50,


            }
        ]}
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
        getTrProps={(st, rowInfo) => ({
            onClick:  onRowClick(rowInfo)
        })

        }

        {...props}
    />)
}




function BackButtonBase({history}){
    return <button className="back" onClick={() => history.push("/schedule")} >
        Back
    </button>
}
const BackButton = withRouter(BackButtonBase);

function HeaderText(){
    return <h1 className={"App-title2"}>MUIC Open Section</h1>
}



class OpenSection extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true,
            status: false,
        };
        this.fetchData = this.fetchData.bind(this);
    }


    fetchData(state, instance) {
        this.setState({ loading: true });
        requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered
        ).then(res => {
            this.setState({
                data: res.rows,
                pages: res.pages,
                loading: false,
            });
        });
    }

    onRowClick = (rowInfo) => (e) => {

        let count =0;

        this.props.coursesA.forEach(function (element) {
            if (rowInfo.original.skyid === element.skyid) {
                count = 1;
            }
        })
        if (count !== 1){
            this.props.onAddCourse(rowInfo.original)

        }
        // console.log(this.props.courses)
    }



    render() {
        const { data, pages, loading } = this.state;
        return (
            <Page ButtonComponent={BackButton} TextComponent={HeaderText} >
                    <div className={"Table-body"}>
                        <div className={"Table-body-2"}>
                            <MyTable data={data}
                                     pages={pages} //Display the total number of pages
                                     loading={loading} // Display the loading overlay when we need it
                                     onFetchData={this.fetchData} // Request new data when things change
                                     onRowClick = {this.onRowClick}
                                     // onButtonClick = {this.onButtonClick}

                                     // status={this.state.status}
                            />
                        </div>
                    </div>
                    {/*<button onClick={this.handleClick}</button>*/}

            </Page>
        );
    }


}


export default OpenSection;
