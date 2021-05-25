import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { selectAssignments, selectSpecific , setSpecific} from '../features/studentData/studentDataSlice'
import { v4 as uuid } from 'uuid';


const AssignmentRadioSelector = () => {
const dispatch = useDispatch();
const assignments = useSelector(selectAssignments);
const selected = useSelector(selectSpecific);

const assignmentInputHandler = (e) => {
    const {name, value} = e.target
    dispatch(setSpecific({[name]:value}))
}

console.log("Selected in redux:" + selected.select)

//checkboxen voor de studenten
const assignmentInputsJsx = assignments.map(assignment => {
    return (
        <div key={uuid()}>
            <label htmlFor={assignment}>
                <input 
                    type="radio" 
                    name="select" 
                    id={assignment} 
                    value={assignment}
                    checked={selected.select===assignment}
                    onChange={assignmentInputHandler}/>
                {assignment}
            </label>
        </div>)
});

return (
    <section className="selectors--assignments">
        <h3>Selecteer opdracht.</h3>
        {assignmentInputsJsx}
    </section>
)
}

export default AssignmentRadioSelector
