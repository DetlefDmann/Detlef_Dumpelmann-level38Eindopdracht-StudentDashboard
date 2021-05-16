import React, { useState } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { selectAssignments, selectSpecific , setSpecific} from '../features/studentData/studentDataSlice'
import { v4 as uuid } from 'uuid';


const AssignmentRadioSelector = () => {
const dispatch = useDispatch();
const assignments = useSelector(selectAssignments);
const selected = useSelector(selectSpecific);
const [selectedSpecific, setSelectedSpecific] = useState({"select":assignments[0]})

const assignmentInputHandler = (e) => {
    const {name, value} = e.target
    setSelectedSpecific({
        [name]:value
    });
    dispatch(setSpecific({[name]:value}))
}

console.log("Selected in redux:" + selected.select)

//checkboxen voor de studenten
const assignmentInputsJsx = assignments.map(assignment => {
    return (
        <React.Fragment key={uuid()}>
            <input 
                type="radio" 
                name="select" 
                id={assignment} 
                value={assignment}
                checked={selected.select===assignment}
                onChange={assignmentInputHandler}/>
            <label htmlFor={assignment}>{assignment}</label>
        </React.Fragment>)
});

return (
    <section className="selectors--assignments">
        <button>Selecteer opdracht.</button>
        {assignmentInputsJsx}
    </section>
)
}

export default AssignmentRadioSelector
