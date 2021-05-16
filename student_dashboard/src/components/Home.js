import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAssignments, selectData, selectStudents, selectLoadingStatus , selectGraphOptions} from '../features/studentData/studentDataSlice'
import Chart2 from './Chart2'
import AssignmentFilterSelector from './AssignmentFilterSelector'
import StudentFilterSelector from './StudentFilterSelector'
import GraphSelectors from './GraphSelectors'
import AssignmentRadioSelector from './AssignmentRadioSelector'
import Chart from './Chart'


const Home = ({student}) => {
    const data = useSelector(selectData);
    const viewType = useSelector(selectGraphOptions)
    const allStudents = useSelector(selectStudents);
    const allAssignments = useSelector(selectAssignments);
    const loadingStatus = useSelector(selectLoadingStatus);
    
    useEffect(() =>{
        
        if(loadingStatus==="ready" && allStudents.length>2){
        console.log("ready")
        };
        
    
    },[data , allAssignments , loadingStatus]);

    const assignmentSelectionJSX = (viewType.viewedData==="specific" )? <AssignmentRadioSelector /> : <AssignmentFilterSelector />
    
    const chartSelectionJSX = viewType.viewedData==="specific" ? <Chart student={student}/> : <Chart2 student={student} />
    
    return (
        <>
            <StudentFilterSelector />{/* <StudentFilterSelector/> hier conditional rendering */}
            {assignmentSelectionJSX}
            <main>
                <h1>Dit is het overzicht.</h1>
                {chartSelectionJSX}
                <GraphSelectors caller="home"/>
            </main>
        </>
    )
}

export default Home
