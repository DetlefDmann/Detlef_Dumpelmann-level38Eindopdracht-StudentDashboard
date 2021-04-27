import React, { useEffect } from 'react'
import Chart2 from './Chart2'
import {calculateAverage, filterArrayByKey} from '../utils'
import { useSelector } from 'react-redux'
import { selectAssignments, selectData, selectStudents, selectLoadingStatus } from '../features/studentData/studentDataSlice'


const Home = ({student}) => {
    const data = useSelector(selectData);
    const allStudents = useSelector(selectStudents);
    const allAssignments = useSelector(selectAssignments);
    const loadingStatus = useSelector(selectLoadingStatus);
    let totalAverages = [];
    useEffect(() =>{
        if(loadingStatus==="ready" && allStudents.length>2){
        totalAverages = allAssignments.map(assignment =>{
            return calculateAverage(filterArrayByKey(data, "assignment", assignment))
            });
        }
        console.log(totalAverages)
    },[data]);
    
    return (
        <main>
            <h1>Dit is het overzicht.</h1>
            <Chart2 student={student}/>
            <h2>Hier een tabel plaatsen met de data uit de sheet</h2>
        </main>
    )
}

export default Home
