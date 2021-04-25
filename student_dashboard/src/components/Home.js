import React from 'react'
import Chart from './Chart'

const Home = ({student}) => {
    return (
        <main>
            <h1>Dit is het overzicht.</h1>
            <Chart student={student}/>
            <h2>Hier een tabel plaatsen met de data uit de sheet</h2>
        </main>
    )
}

export default Home
