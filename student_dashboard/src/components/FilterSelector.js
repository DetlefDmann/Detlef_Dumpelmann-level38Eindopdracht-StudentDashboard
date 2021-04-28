import React from 'react'
import { useSelector } from 'react-redux'
import { selectAssignments, selectStudents } from '../features/studentData/studentDataSlice'
import { v4 as uuid } from 'uuid';

const FilterSelector = () => {
const students = useSelector(selectStudents);
const assignments = useSelector(selectAssignments);
const inputHandler = (e) => {
    console.log(e.target);
}

const studentInputsJsx = students.map(student => {
    return (
        <React.Fragment key={uuid()}>
            <input type="checkbox" name={student} id={student} onChange={inputHandler}/>
            <label htmlFor={student}>{student}</label>
        </React.Fragment>)
});
const assignmentsInputJSX = assignments.map(assignment => {
    return (
        <React.Fragment key={uuid()}>
            <input type="checkbox" name={assignment} id={assignment} onChange={inputHandler}/>
            <label htmlFor={assignment}>{assignment}</label>
        </React.Fragment>
    )
});



    return (
        <section>
            {assignmentsInputJSX}
            {studentInputsJsx}
        </section>
    )
}

export default FilterSelector
