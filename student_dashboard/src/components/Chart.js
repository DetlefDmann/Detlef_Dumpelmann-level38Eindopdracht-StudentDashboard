import React from 'react';
import './Chart.css'
import { scaleBand , scaleLinear , axisLeft , axisBottom } from 'd3'; 
import { useSelector } from 'react-redux';
import { selectData } from "../features/studentData/studentDataSlice";



const Chart = ({ student }) => {
    const data = useSelector(selectData);
    let filteredData = [];
    if( typeof student!=="undefined"){
        filteredData = data.filter(d => d.student===student);
    }
    else {
        filteredData = data.slice(0,10);
        //hier kunnen de methodes voor de home page komen
    };

    
    const width = 1200;
    const height = 500;
    const margin = { top:20 , right:20 , bottom:120 , left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const axisHeight = innerHeight + 10;

    //Om een of andere reden moet de data opgeschaald worden:
    const scaleToValues = 68;
    const xScale = scaleBand()
                    .domain( filteredData.map(d => d.assignment))
                    .range([0 , innerWidth])
                    .paddingInner(0.1)
                
    const yScale = scaleLinear()
                    .domain([0, 5])
                    .range([innerHeight , margin.top ]);

    const xOffset = width/filteredData.length*2 - innerWidth/filteredData.length*2

    const x_as = axisBottom()
                    .scale(xScale);

    const y_as = axisLeft()
                    .scale(yScale); 
        

    return (
        <svg width={width} height={height} className="chartcontainer">
            <g transform={`translate(${margin.left},${margin.top})`}>
                {yScale.ticks().map(tickValue => (
                    <g key={`${tickValue}y`} transform={`translate(0, ${yScale(tickValue)})`}>
                        <line  x2={innerWidth} stroke="grey" />
                        <text style={{textAnchor:"end"}} dy=".5em" x="-.5em">{tickValue}</text>
                    </g>
                ))};
                <g transform={`translate(${-innerHeight + xOffset + margin.left + innerWidth/(filteredData.length*2)}, -10)`}>
                {xScale.domain().map(tickValue => (
                    <g key={`${tickValue}x`} transform={`translate(${xScale(tickValue)},0) `}>
                        <text transform={`rotate(315)`} style={{textAnchor:"end"}} x={-margin.left} y={height}>{tickValue}</text>
                    </g>
                ))};
                </g>
                {filteredData.map((d,i) => <g key={`${i}rect`}>
                    <rect key={i} x={xScale(d.assignment)+ xOffset} y={ innerHeight-d.funFactor*scaleToValues} width={(innerWidth/(filteredData.length*2.5))} height={d.funFactor*scaleToValues} className="funFactor" />
                    <rect key={i+filteredData.length} x={xScale(d.assignment) + innerWidth/(filteredData.length*2)} y={ innerHeight-d.difficulty*scaleToValues} width={(innerWidth/(filteredData.length*2.5))} height={d.difficulty*scaleToValues} className="difficulty"/>
                    </g>)
                }
            </g>
        </svg>
    )
}

export default Chart
