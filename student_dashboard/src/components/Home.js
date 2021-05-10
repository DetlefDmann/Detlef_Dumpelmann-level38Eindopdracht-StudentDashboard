import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { selectAssignments, selectData, selectStudents, selectLoadingStatus} from '../features/studentData/studentDataSlice'
import Chart2 from './Chart2'
import FilterSelector from './FilterSelector'
import LineChart from './LineChart'


const Home = ({student}) => {
    const dispatch = useDispatch()
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
        <main>
            <h1>Dit is het overzicht.</h1>
            <Chart2 student={student} />
            <FilterSelector/>
            <h2>Hier een tabel plaatsen met de data uit de sheet</h2>
        </main>
    )
}

export default Home
