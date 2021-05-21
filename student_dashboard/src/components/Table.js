import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { filterArrayByKey } from '../utils';
import { selectLoadingStatus , selectArrayPerStudent, selectAssignmentsIsChecked, selectData, selectGraphOptions, selectStudentsIsChecked } from '../features/studentData/studentDataSlice';
import { v4 as uuid } from 'uuid';

const Table = () => {
    const assignmentsPerStudent = useSelector(selectArrayPerStudent)
    const data = useSelector(selectData);
    const graphOptions = useSelector(selectGraphOptions);
    const studentChecked = useSelector(selectStudentsIsChecked);
    const [filteredData, setFilteredData] = useState(data);
    const loadingStatus = useSelector(selectLoadingStatus);
    const assignmentChecked = useSelector(selectAssignmentsIsChecked);
    
useEffect(() => {
    //nieuw totaal array maken met de assignments van alle aangevinkte studenten
    let filteredByStudent = [];
    for (const key in studentChecked) {
      if (studentChecked[key]) {
        filteredByStudent = filteredByStudent.concat(assignmentsPerStudent[key])
      }
      else console.log("Student checked key: " + studentChecked[key])
    }

    //filteren op opdracht
          //maak een array met alleen de assignments die aangevinkt zijn
          let filteredAssignmentsArray = [];
          for (const key in assignmentChecked) {
              if (assignmentChecked[key]) {
                filteredAssignmentsArray = filteredAssignmentsArray.concat(filterArrayByKey(filteredByStudent , "assignment" , key))
              }
          }
        setFilteredData(filteredAssignmentsArray);
        let sortedFiltered = [...filteredAssignmentsArray]

    //sorteerfunctie
    if (graphOptions.sort==="normal"){
        setFilteredData(filteredAssignmentsArray);
     }
     else if (graphOptions.sort==="mostfun") {
        sortedFiltered = sortedFiltered.sort((a,b) => b.funFactor -a.funFactor);
        setFilteredData(sortedFiltered);
     }
     else {
         sortedFiltered = sortedFiltered.sort((a,b) => b.difficulty -a.difficulty);
         setFilteredData(sortedFiltered);
    }
},[loadingStatus , graphOptions , studentChecked , assignmentChecked])

    //hier worden de rijen van de tabel met data gevuld
    const tableCellsJSX = filteredData.map( row => {
        return (<tr key={uuid()}>
                    <td>{row.student}</td>
                    <td>{row.assignment}</td>
                    <td>{row.difficulty}</td>
                    <td>{row.funFactor}</td>
                </tr>)
            });

    return (
        <table >
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Opdracht</th>
                    <th>Moeilijkheid</th>
                    <th>Hoe leuk</th>
                </tr>
            </thead>
            <tbody>
                {tableCellsJSX}
            </tbody>
            
        </table>
    )
}

export default Table
