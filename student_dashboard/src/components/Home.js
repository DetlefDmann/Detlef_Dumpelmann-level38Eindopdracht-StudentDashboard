import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { selectAssignments, selectData, selectStudents, selectLoadingStatus} from '../features/studentData/studentDataSlice'
import Chart2 from './Chart2'
import AssignmentFilterSelector from './AssignmentFilterSelector'
import StudentFilterSelector from './StudentFilterSelector'


const Home = ({student}) => {
    const data = useSelector(selectData);
    const allStudents = useSelector(selectStudents);
    const allAssignments = useSelector(selectAssignments);
    const loadingStatus = useSelector(selectLoadingStatus);
    
    useEffect(() =>{
        
        if(loadingStatus==="ready" && allStudents.length>2){
        console.log("ready")
        };
        
    
    },[data , allAssignments , loadingStatus]);
    
    return (
        <>
            <StudentFilterSelector/>
            <AssignmentFilterSelector/>
            <main>
                <h1>Dit is het overzicht.</h1>
                <Chart2 student={student} />
            </main>
        </>
    )
}

export default Home
