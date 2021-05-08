import React from "react";
import Chart from "../../components/Chart";

const StudentData = ({student}) => {
    // Hier willen we wat informatie over de student neer zetten,
    //wanneer we op de homepage zijn willen we juist algemene informatie weergeven.

    return (
        <main>
            <h1>Dit is de pagina van {student}</h1>
            <Chart student={student}/>
        </main>
    )
}

export default StudentData
