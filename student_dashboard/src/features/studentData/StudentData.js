import React, { useState , useEffect } from "react";
import { useSelector , useDispatch } from 'react-redux';
import { selectData , getDataFromGist } from "./studentDataSlice";

const StudentData = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataFromGist());
    },[])

    const csvData = useSelector(selectData);
    console.log(csvData)
    return (
        <div>
            <h1>Hello teacher.</h1>
        </div>
    )
}

export default StudentData
