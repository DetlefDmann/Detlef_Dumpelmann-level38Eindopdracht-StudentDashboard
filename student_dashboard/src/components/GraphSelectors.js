import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { selectGraphOptions , setGraphOptions } from '../features/studentData/studentDataSlice';


const GraphSelectors = () => {
    const dispatch = useDispatch();
    const graphOptions = useSelector(selectGraphOptions);
    console.log("graphOptions:" + graphOptions.show);

    const inputHandler = (event) => {
        const {name , value} = event.target;
        console.log(name);
        dispatch(setGraphOptions({
            ...graphOptions, [name]:value
        }))
    }

    return (
        <div className="graph--options">
            {/* wat laten we zien */}
            <label htmlFor="show">Welke waarden wil je zien?</label>
            <select name="show" id="show" value={graphOptions.show} onChange={inputHandler}>
                <option value="difficulty">Laat moeilijkheid zien</option>
                <option value="funFactor">Laat zien hoe leuk het was</option>
                <option value="both">Laat beide zien</option>
            </select><br />

            {/* soort grafiek */}
            <label htmlFor="graphType">Soort grafiek</label>
            <select name="graphType" id="graphType" value={graphOptions.graphType} onChange={inputHandler}>
                <option value="line">Lijn grafiek</option>
                <option value="bar">Staaf grafiek</option>
                <option value="lineAndBar">Beide grafieken</option>
            </select><br />
            {/* sorteren op */}
            <label htmlFor="sort">Sorteer opties</label>
            <select name="sort" id="sort" value={graphOptions.sort} onChange={inputHandler}>
                <option value="normal">Sorteer op opdracht</option>
                <option value="mostfun">Sorteer op meest leuk</option>
                <option value="mostdifficult">Sorteer op moeilijkheid</option>
            </select>
        </div>
    )
}

export default GraphSelectors
