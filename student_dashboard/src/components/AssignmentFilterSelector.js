import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { selectAssignments, selectAssignmentsIsChecked, setAssignmentsIsChecked} from '../features/studentData/studentDataSlice'
import { v4 as uuid } from 'uuid';

const AssignmentFilterSelector = () => {
const assignments = useSelector(selectAssignments);
const assignmentIsChecked = useSelector(selectAssignmentsIsChecked);
const dispatch = useDispatch();

const assignmentInputHandler = (e) => {
    const {name, checked} = e.target;
    dispatch(setAssignmentsIsChecked({
        ...assignmentIsChecked, [name]:checked
    }))
}

//checkboxen voor de opdrachten
const assignmentsInputJSX = assignments.map(assignment => {
    return (
        <React.Fragment key={uuid()}>
            <div><label htmlFor={assignment}>
                <input 
                type="checkbox" 
                name={assignment} 
                id={assignment} 
                checked={assignmentIsChecked[assignment]}
                onChange={assignmentInputHandler}/>
                {assignment}
            </label></div>
            
        </React.Fragment>
    )
});



    return (
        <section className="selectors--assignments">
            <h3>Selecteer opdrachten.</h3><br />
            {assignmentsInputJSX}
        </section>
    )
}

export default AssignmentFilterSelector
