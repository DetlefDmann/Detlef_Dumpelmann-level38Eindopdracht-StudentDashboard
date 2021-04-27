import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { selectStudents } from '../features/studentData/studentDataSlice'

const NavBar = () => {
    const studentNames = useSelector(selectStudents);
    console.log("Studenten navbar" + studentNames)
    const linksJSX = studentNames.map(studentName => {
        return (
        <li key={`${studentName}linkitem`}>
            <Link to={`${studentName}`}>{studentName}</Link>
        </li>)
    });

    return (
        <nav>
            <ul className="nav__list">
                <li className="nav__listitem"><Link to="home">Home</Link></li>
                {linksJSX}
            </ul>
        </nav>
    )
}

export default NavBar
