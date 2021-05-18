import React from 'react'
import { useSelector } from 'react-redux';
import { selectArrayPerStudent } from '../features/studentData/studentDataSlice';
import { calculateAverage } from '../utils';

const StudentStats = ({student}) => {
    const allStudentsAssignmentArrays = useSelector(selectArrayPerStudent) ;
    let thisStudentArray = [...allStudentsAssignmentArrays[student]];
    const averageValues = calculateAverage(thisStudentArray);

    //sorteren op moeilijk en leuk om te kijken welke opdracht wel moeilijk maar toch leuk was
    thisStudentArray.sort((a,b) => b.funFactor - a.funFactor);
    thisStudentArray.sort((a,b) => b.difficulty - a.difficulty);

    return (
        <section className="student__stats" >
            <h3>Statistische info</h3>
            <p>De gemiddelde score voor moeilijkheid: 
                {Math.round(averageValues.difficulty*100)/100} <br />
                <hr />
                De gemiddelde score voor leuk: 
                {Math.round(averageValues.funFactor*100)/100} <br />
                <hr />
                Deze opdracht was moeilijk, maar best leuk: {thisStudentArray[0].assignment}
                <hr />
                Deze opdracht was makkelijk, maar minder leuk: {thisStudentArray[thisStudentArray.length-1].assignment}
            </p>
        </section>
    )
}

export default StudentStats
