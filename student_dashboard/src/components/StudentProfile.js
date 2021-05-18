import React from 'react'
import Data from '../features/studentData/studentInfo.json'

const StudentProfile = ({student}) => {
    const info = Data[student];
    return (
        <section className="student__profile" >
            <h3>{student} {info.lastName}</h3>
            <img className="picture" src={info.photoURL} alt={`Foto van ${student}`} />
            <p>E-mail: {info.eMail} <br />
                Tel.nr.: {info.phoneNr} <br />
                Leeftijd: {info.age} jaar
            </p>
        </section>
    )
}

export default StudentProfile
