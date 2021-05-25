import React from 'react'
import { useSelector } from 'react-redux'
import { selectGraphOptions} from '../features/studentData/studentDataSlice'
import Chart2 from './Chart2'
import AssignmentFilterSelector from './AssignmentFilterSelector'
import StudentFilterSelector from './StudentFilterSelector'
import GraphSelectors from './GraphSelectors'
import AssignmentRadioSelector from './AssignmentRadioSelector'
import Chart from './Chart'
import Table from './Table'


const Home = ({student}) => {
    const viewType = useSelector(selectGraphOptions)

    const assignmentSelectionJSX = viewType.viewedData==="specific" ? <AssignmentRadioSelector /> : <AssignmentFilterSelector />;
    
    const chartSelectionJSX = viewType.viewedData==="specific" ? <Chart student={student}/> : <Chart2 student={student} />;
    
    return (
        <>
            <StudentFilterSelector />
            {assignmentSelectionJSX}
            <main>
                <h1>Dit is het overzicht.</h1>
                {chartSelectionJSX}
                <GraphSelectors caller="home"/>
                <br /><hr />
                <h3>Data in tabel vorm.</h3>
                <p>De in de grafiek gebruikte data staat in de hier volgende tabel:</p>
                <Table />
            </main>
        </>
    )
}

export default Home
