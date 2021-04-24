import React from "react";
import { useSelector } from 'react-redux';
import Chart from "../../components/Chart";
import { selectData  } from "./studentDataSlice";

const StudentData = ({student}) => {

    // const csvData = useSelector(selectData);
    // console.log(csvData)
    return (
        <div>
            <Chart student={student}/>
        </div>
    )
}

export default StudentData
