import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { selectAssignments, selectIsChecked, selectStudents , setIsChecked } from '../features/studentData/studentDataSlice'
import { v4 as uuid } from 'uuid';

const FilterSelector = () => {
const students = useSelector(selectStudents);
const assignments = useSelector(selectAssignments);
const isChecked = useSelector(selectIsChecked); 
const dispatch = useDispatch();

const inputHandler = (e) => {
    const {name, checked} = e.target
    console.log(checked + name);
    dispatch(setIsChecked({
        ...isChecked, [name]:checked
    }))
}

const studentInputsJsx = students.map(student => {
    return (
        <React.Fragment key={uuid()}>
            <input 
                type="checkbox" 
                name={student} 
                id={student} 
                checked={isChecked[student]} 
                onChange={inputHandler}/>
            <label htmlFor={student}>{student}</label>
        </React.Fragment>)
});
const assignmentsInputJSX = assignments.map(assignment => {
    return (
        <React.Fragment key={uuid()}>
            <input 
                type="checkbox" 
                name={assignment} 
                id={assignment} 
                checked={isChecked[assignment]}
                onChange={inputHandler}/>
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
