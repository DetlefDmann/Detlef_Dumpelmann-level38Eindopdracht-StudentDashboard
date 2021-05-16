import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { selectGraphOptions , setGraphOptions } from '../features/studentData/studentDataSlice';


const GraphSelectors = ({caller}) => {
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

    const optionalInputJSX = (caller==="home") ? <><label htmlFor="viewedData" >per </label>
            <select name="viewedData" id="viewedData" value={graphOptions.viewedData} onChange={inputHandler} >
                <option value="general">opdracht van meerdere opdrachten </option>
                <option value="specific">student van 1 specifieke opdracht </option>
            </select><br /></>: null

    return (
        <div className="graph--options">
            {/* wat laten we zien */}
            <label htmlFor="show">Laat </label>
            <select name="show" id="show" value={graphOptions.show} onChange={inputHandler}>
                <option value="difficulty">de moeilijkheid zien</option>
                <option value="funFactor"> zien hoe leuk het was</option>
                <option value="both"> de moeilijkheid zien en hoe leuk het was</option>
            </select><br />

            {/* soort grafiek */}
            <label htmlFor="graphType">in </label>
            <select name="graphType" id="graphType" value={graphOptions.graphType} onChange={inputHandler}>
                <option value="line">een lijn grafiek</option>
                <option value="bar">een staaf grafiek</option>
                <option value="lineAndBar">zowel een lijngrafiek als een staafgrafiek</option>
            </select><br />
            {/* rating per opdracht (totaaloverzicht) of rating per student (van 1 opdracht) */}
            {optionalInputJSX}
            {/* sorteren op */}
            <label htmlFor="sort">gesorteerd </label>
            <select name="sort" id="sort" value={graphOptions.sort} onChange={inputHandler}>
                <option value="normal"> { graphOptions.viewedData==="general"? "op opdracht" : "op student"}</option>
                <option value="mostfun"> op meest leuk</option>
                <option value="mostdifficult"> op moeilijkheid</option>
            </select><br />
            
        </div>
    )
}

export default GraphSelectors
