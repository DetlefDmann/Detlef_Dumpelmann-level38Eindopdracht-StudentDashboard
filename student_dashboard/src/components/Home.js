import React from 'react'
import { useSelector } from 'react-redux'
import { selectGraphOptions} from '../features/studentData/studentDataSlice'
import Chart2 from './Chart2'
import AssignmentFilterSelector from './AssignmentFilterSelector'
import StudentFilterSelector from './StudentFilterSelector'
import GraphSelectors from './GraphSelectors'
import AssignmentRadioSelector from './AssignmentRadioSelector'
import Chart from './Chart'


const Home = ({student}) => {
    const viewType = useSelector(selectGraphOptions)

    const assignmentSelectionJSX = (viewType.viewedData==="specific" )? <AssignmentRadioSelector /> : <AssignmentFilterSelector />
    
    const chartSelectionJSX = viewType.viewedData==="specific" ? <Chart student={student}/> : <Chart2 student={student} />
    
    return (
        <>
            <StudentFilterSelector />
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
