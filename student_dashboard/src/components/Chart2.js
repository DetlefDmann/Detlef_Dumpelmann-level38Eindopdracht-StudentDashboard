import React, { useEffect, useState } from 'react';
import './Chart.css'
import { scaleBand , scaleLinear , line } from 'd3'; 
import { useSelector } from 'react-redux';
import { selectAverageArray, selectData, selectAssignmentsIsChecked, selectLoadingStatus } from "../features/studentData/studentDataSlice";



const Chart2 = ({ student }) => {
    const data = useSelector(selectData);
    const averages = useSelector(selectAverageArray);
    const [filteredData, setFilteredData] = useState(averages);

    let loadingStatus = "idle"
    
    let selectedAssignments = useSelector(selectAssignmentsIsChecked);// dit is een object met booleans for iedere assignment
    loadingStatus = useSelector(selectLoadingStatus);

    useEffect(() => {
        if( typeof student!=="undefined"){
            console.log("Student is defined?")
            setFilteredData(data.filter(d => d.student===student));
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

    

    
    const width = 300;
    const height = 125;
    const margin = { top:5 , right:1 , bottom:40, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    //De data moet opgeschaald worden:
    const scaleToValues = innerHeight/5;

    //Schaal voor de x-as
    const xScale = scaleBand()
                    .domain( filteredData.map(d => d.assignment))
                    .range([0 , innerWidth])
                    .paddingInner(0.1);

    //Schaal voor de y-as          
    const yScale = scaleLinear()
                    .domain([0,5])
                    .range([ innerHeight,0 ]);

    const xOffset = width/filteredData.length*2 - innerWidth/filteredData.length*2        

    return (
        <div >
        <svg width={width} height={height} className="chartcontainer" >
            <g transform={`translate(${margin.left},${margin.top})`} className="chart">
                {yScale.ticks(10).map(tickValue => (
                    <g key={`${tickValue}y`} transform={`translate(0, ${yScale(tickValue)})`}>
                        <line  x2={innerWidth} stroke="grey" strokeWidth="0.5"/>
                        <text style={{textAnchor:"end"}} dy=".5em" x="-.5em">{tickValue}</text>
                    </g>
                ))};
                <g  className="xTicks">
                    {xScale.domain().map(tickValue => (
                        <g key={`${tickValue}x`} transform={`translate(${xScale(tickValue) + innerWidth/(filteredData.length*2) -10},0) `}>
                            <text transform={`rotate(315)`} style={{textAnchor:"end"}} x={-margin.left } y={innerHeight*Math.sqrt(2)}>{tickValue}</text>
                        </g>
                ))};
                </g>
                {filteredData.map((d,i) => (
                    <g key={`${i}rect`}>
                        <rect 
                            key={i} 
                            x={xScale(d.assignment) + xOffset/4} 
                            y={innerHeight - d.funFactor*scaleToValues} 
                            width={(innerWidth/(filteredData.length*2.5))} 
                            height={d.funFactor*scaleToValues} 
                            className="funFactor--bar"
                            strokeWidth="0.25"
                        >
                            <title>{d.assignment} Fun factor: {(Math.round(d.funFactor*100))/100}</title>
                        </rect>
                        <rect 
                            key={i+filteredData.length} 
                            x={xScale(d.assignment) + innerWidth/(filteredData.length*2)} 
                            y={ innerHeight-d.difficulty*scaleToValues} 
                            width={(innerWidth/(filteredData.length*2.5))} 
                            height={d.difficulty*scaleToValues} 
                            className="difficulty--bar"
                            strokeWidth="0.25"
                            > <title>
                                <title>
                                    {d.assignment} <br />
                                </title>
                                <title>
                                    Moeilijkheid: {(Math.round(d.difficulty*100))/100}
                                </title>
                            </title>
                        </rect>
                        <path className="difficulty--line"
                            fill="none"
                            stroke="black"
                            strokeWidth="0.5"
                            d={line()
                                .x((d,i) => (i*innerWidth/filteredData.length)+(xOffset*i+innerWidth)/(filteredData.length*2))
                                .y((d => innerHeight -d.difficulty*scaleToValues))(filteredData)}
                        />
                        <path className="funFactor--line"
                            fill="none"
                            stroke="red"
                            strokeWidth="0.5"
                            d={line()
                                .x((d,i) => (i*innerWidth/filteredData.length)+(xOffset*i+innerWidth)/(filteredData.length*2))
                                .y((d => innerHeight -d.funFactor*scaleToValues))(filteredData)}
                        />
                    </g>))
                }
            </g>
        </svg>
        </div>
    )
}

export default Chart2
