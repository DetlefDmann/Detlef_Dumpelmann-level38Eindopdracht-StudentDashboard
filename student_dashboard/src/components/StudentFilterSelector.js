import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { selectStudentsIsChecked, selectStudents , setStudentsIsChecked } from '../features/studentData/studentDataSlice'
import { v4 as uuid } from 'uuid';

const StudentFilterSelector = () => {
const students = useSelector(selectStudents);
const studentIsChecked = useSelector(selectStudentsIsChecked);
const dispatch = useDispatch();

const studentInputHandler = (e) => {
    const {name, checked} = e.target
    console.log(checked + name);
    dispatch(setStudentsIsChecked({
        ...studentIsChecked, [name]:checked
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

return (
    <section className="selectors--students">
        <button>Selecteer studenten.</button>
        {studentInputsJsx}
    </section>
)
}

export default StudentFilterSelector
