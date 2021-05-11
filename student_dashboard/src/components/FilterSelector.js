import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { selectAssignments, selectAssignmentsIsChecked, selectStudentsIsChecked, selectStudents , setStudentsIsChecked , setAssignmentsIsChecked} from '../features/studentData/studentDataSlice'
import { v4 as uuid } from 'uuid';

const FilterSelector = () => {
const students = useSelector(selectStudents);
const assignments = useSelector(selectAssignments);
const studentIsChecked = useSelector(selectStudentsIsChecked);
const assignmentIsChecked = useSelector(selectAssignmentsIsChecked);
const dispatch = useDispatch();

const studentInputHandler = (e) => {
    const {name, checked} = e.target
    console.log(checked + name);
    dispatch(setStudentsIsChecked({
        ...studentIsChecked, [name]:checked
    }))
}
const assignmentInputHandler = (e) => {
    const {name, checked} = e.target
    console.log(checked + name);
    dispatch(setAssignmentsIsChecked({
        ...assignmentIsChecked, [name]:checked
    }))
}

//checkboxen voor de studenten
const studentInputsJsx = students.map(student => {
    return (
        <React.Fragment key={uuid()}>
            <input 
                type="checkbox" 
                name={student} 
                id={student} 
                checked={studentIsChecked[student]} 
                onChange={studentInputHandler}/>
            <label htmlFor={student}>{student}</label>
        </React.Fragment>)
});

//checkboxen voor de opdrachten
const assignmentsInputJSX = assignments.map(assignment => {
    return (
        <React.Fragment key={uuid()}>
            <input 
                type="checkbox" 
                name={assignment} 
                id={assignment} 
                checked={assignmentIsChecked[assignment]}
                onChange={assignmentInputHandler}/>
            <label htmlFor={assignment}>{assignment}</label>
        </React.Fragment>
    )
});



    return (
        <section className="selectors">
            <button>Selecteer opdrachten.</button>
            {assignmentsInputJSX}
            <button>Selecteer studenten.</button>
            {studentInputsJsx}
        </section>
    )
}

export default FilterSelector
