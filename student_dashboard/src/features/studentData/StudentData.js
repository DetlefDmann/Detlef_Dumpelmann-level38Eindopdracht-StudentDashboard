import React from "react";
import Chart2 from "../../components/Chart2";
import GraphSelectors from '../../components/GraphSelectors'

const StudentData = ({student}) => {
    // Hier willen we wat informatie over de student neer zetten,
    //wanneer we op de homepage zijn willen we juist algemene informatie weergeven.

    return (
        <main>
            <h1>Dit is de pagina van {student}</h1>
            <Chart2 student={student}/>
            <GraphSelectors />
        </main>
    )
}

export default StudentData
