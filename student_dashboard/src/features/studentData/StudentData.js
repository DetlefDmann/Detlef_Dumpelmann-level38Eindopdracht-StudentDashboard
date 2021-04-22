import React, { useState , useEffect } from "react";
import { useSelector , useDispatch } from 'react-redux';
import Chart from "../../components/Chart";
import { selectData , getDataFromGist } from "./studentDataSlice";

const StudentData = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        //deze data hoeft maar een keer opgehaald te worden
        dispatch(getDataFromGist());
    },[])

    const csvData = useSelector(selectData);
    console.log(csvData)
    return (
        <div>
            <Chart />
        </div>
    )
}

export default StudentData
