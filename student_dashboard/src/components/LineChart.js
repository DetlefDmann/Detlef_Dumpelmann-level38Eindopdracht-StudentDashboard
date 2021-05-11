import React, { useEffect, useState } from 'react';
import './Chart.css'
import { line, scaleBand , scaleLinear } from 'd3'; 
import { useSelector } from 'react-redux';
import { selectAverageArray, selectData, selectAssignmentsIsChecked, selectLoadingStatus } from "../features/studentData/studentDataSlice";


const LineChart = () => {
    const data = useSelector(selectData);
    const averages = useSelector(selectAverageArray);
    const [filteredData, setFilteredData] = useState(averages);
    
    //let selectedAssignments = useSelector(selectAssignmentsIsChecked);// dit is een object met booleans for iedere assignment
    let loadingStatus = useSelector(selectLoadingStatus);
  
    const width = 1200;
    const height = 500;
    const margin = { top:20 , right:20 , bottom:140 , left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        if( typeof student!=="undefined"){
            console.log("Student is defined?")
            //setFilteredData(data.filter(d => d.student===student));
        }
        else if(loadingStatus==="ready"){
            
            //         let newfilteredData = filteredData.filter(datapoint => {
            //             return filterValues[datapoint.assignment]!==true
            //         });
        
             console.log(filteredData)
             setFilteredData(averages);

            //hier kunnen de methodes voor de home page komen
         };
    },[data , averages, loadingStatus])

    //De data moet opgeschaald worden:
    const scaleToValues = innerHeight/5;

    //Schaal voor de x-as
    const xScale = scaleBand()
                    .domain( filteredData.map(d => d.assignment))
                    .range([0 , innerWidth]);

    //Schaal voor de y-as          
    const yScale = scaleLinear()
                    .domain([0,5])
                    .range([ innerHeight,0 ]);

    const xOffset = width/filteredData.length*2 - innerWidth/filteredData.length*2        

    return (
        <svg width={width} height={height} className="chartcontainer">
            <g transform={`translate(${margin.left},${margin.top})`}>
                {yScale.ticks(10).map(tickValue => (
                    <g key={`${tickValue}y`} transform={`translate(0, ${yScale(tickValue)})`}>
                        <line  x2={innerWidth} stroke="grey" />
                        <text style={{textAnchor:"end"}} dy=".5em" x="-.5em">{tickValue}</text>
                    </g>
                ))};
                <g transform={`translate(${-innerHeight  + margin.left }, -15)`}>
                    {xScale.domain().map(tickValue => (
                        <g key={`${tickValue}x`} transform={`translate(${xScale(tickValue) + innerWidth/(filteredData.length*2) -10},0) `}>
                            <text transform={`rotate(315)`} style={{textAnchor:"end"}} x={-margin.left } y={innerHeight*Math.sqrt(2)}>{tickValue}</text>
                        </g>
                ))};
                </g>
                <path className="difficulty--line"
                     fill="none"
                    stroke="black"
                    strokeWidth="2"
                    d={line()
                          .x((d,i) => (i*innerWidth/filteredData.length)+(xOffset*i*2+innerWidth)/(filteredData.length*2))
                          .y((d => innerHeight -d.difficulty*scaleToValues))(filteredData)}
                />
                <path className="funfactor--line"
                     fill="none"
                    stroke="red"
                    strokeWidth="2"
                    d={line()
                        .x((d,i) => (i*innerWidth/filteredData.length)+(xOffset*i*2+innerWidth)/(filteredData.length*2))
                        .y((d => innerHeight -d.funFactor*scaleToValues))(filteredData)}
                />
            </g>
        </svg>
    )
}

export default LineChart
