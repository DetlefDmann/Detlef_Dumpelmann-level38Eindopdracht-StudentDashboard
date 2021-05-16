import React, { useEffect, useState } from 'react';
import './Chart.css'
import { scaleBand , scaleLinear , line } from 'd3'; 
import { useSelector } from 'react-redux';
import { selectAverageArray, selectData, selectAssignmentsIsChecked, selectLoadingStatus ,selectGraphOptions, selectSpecific } from "../features/studentData/studentDataSlice";
import { filterArrayByKey } from '../utils';



const Chart = ({ student }) => {
    const data = useSelector(selectData);
    const specific = useSelector(selectSpecific);
    const averages = useSelector(selectAverageArray);
    const graphOptions = useSelector(selectGraphOptions);
    const specificData = filterArrayByKey(data , "assignment" , specific.select)// DATA van de geselecteerde opdracht
    const [filteredData, setFilteredData] = useState(specificData);// moet nu rating van 1 opdracht van iedere student zijn ? !!!!!!!!!!!!!!!!!!!!!!

    let loadingStatus = "idle"
    
    let selectedAssignments = useSelector(selectAssignmentsIsChecked);// dit is een object met booleans for iedere assignment
    loadingStatus = useSelector(selectLoadingStatus);

    useEffect(() => {
        if(loadingStatus==="ready"){////////// hier een versie maken voor het per opdracht bekijken van de cijfers die studenten hebben gegeven
            let sortedAverages = [...specificData]
             console.log(graphOptions.sort)
             if (graphOptions.sort==="normal"){
                setFilteredData(specificData);
             }
             else if (graphOptions.sort==="mostfun") {
                sortedAverages = sortedAverages.sort((a,b) => b.funFactor -a.funFactor);
                setFilteredData(sortedAverages);
             }
             else {
                 sortedAverages = sortedAverages.sort((a,b) => b.difficulty -a.difficulty);
                 setFilteredData(sortedAverages);
            }

            //hier kunnen de methodes voor de home page komen
         };
    },[data , loadingStatus, specific , graphOptions])

    

    
    const width = 300;
    const height = 125;
    const margin = { top:5 , right:1 , bottom:40, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    //De data moet opgeschaald worden:
    const scaleToValues = innerHeight/5;

    //Schaal voor de x-as
    const xScale = scaleBand()
                    .domain( filteredData.map(d => d.student))
                    .range([0 , innerWidth])
                    .paddingInner(0.1);

    //Schaal voor de y-as          
    const yScale = scaleLinear()
                    .domain([0,5])
                    .range([ innerHeight,0 ]);

    const xOffset = width/filteredData.length*2 - innerWidth/filteredData.length*2        

    //De y-as elementen
    const YAxis = () => { 
        return yScale.ticks(10).map(tickValue => (
                <g key={`${tickValue}y`} transform={`translate(0, ${yScale(tickValue)})`}>
                    <line  x2={innerWidth} stroke="grey" strokeWidth="0.5"/>
                    <text style={{textAnchor:"end"}} dy=".5em" x="-.5em">{tickValue}</text>
                </g>)
                );
    }

    //De x-as elementen
    const XAxis = () => {
    return <g className="xTicks">
            {xScale.domain().map(tickValue => (
                <g key={`${tickValue}x`} transform={`translate(${xScale(tickValue) + innerWidth/(filteredData.length*2) -10},0) `}>
                    <text transform={`rotate(315)`} style={{textAnchor:"end"}} x={-margin.left } y={innerHeight*Math.sqrt(2)}>{tickValue}</text>
                </g>)
            )}
        </g>;
    }

    //De staafgrafiek voor leuk op de x-as per student doen!!!!!!!
    const FunBarJSX = () => {
        if ((graphOptions.show==="both"||graphOptions.show==="funFactor") && (graphOptions.graphType==="bar"||graphOptions.graphType==="lineAndBar")) {
            return filteredData.map((d,i) => (
                <rect 
                    key={i} 
                    x={xScale(d.student) + xOffset/4} 
                    y={innerHeight - d.funFactor*scaleToValues} 
                    width={(innerWidth/(filteredData.length*2.5))} 
                    height={d.funFactor*scaleToValues} 
                    className="funFactor--bar"
                    strokeWidth="0.25"
                >
                    <title>{d.student} Fun factor: {(Math.round(d.funFactor*100))/100}</title>
                </rect>));
        }
        else return null;
    }

    //De staafgrafiek voor moeilijk
    const DiffBarJSX = () => {
        if ((graphOptions.show==="both"||graphOptions.show==="difficulty") && (graphOptions.graphType==="bar"||graphOptions.graphType==="lineAndBar")){
        return filteredData.map((d,i) => (
                <rect 
                    key={i+filteredData.length} 
                    x={xScale(d.student) + innerWidth/(filteredData.length*2)} 
                    y={ innerHeight-d.difficulty*scaleToValues} 
                    width={(innerWidth/(filteredData.length*2.5))} 
                    height={d.difficulty*scaleToValues} 
                    className="difficulty--bar"
                    strokeWidth="0.25"
                    > <title>
                        <title>
                            {d.student} <br></br>
                        </title>
                        <title>
                            Moeilijkheid: {(Math.round(d.difficulty*100))/100}
                        </title>
                    </title>
                </rect>));
        }
        else return null;
    };

    //De lijngrafiek voor leuk
    const FunLineJSX = () => {
        if ((graphOptions.show==="both"||graphOptions.show==="funFactor") && (graphOptions.graphType==="line"||graphOptions.graphType==="lineAndBar")){
        return (<path className="funFactor--line"
                            fill="none"
                            stroke="red"
                            strokeWidth="0.5"
                            d={line()
                                .x((d,i) => (i*innerWidth/filteredData.length)+(xOffset*i+innerWidth)/(filteredData.length*2))
                                .y((d => innerHeight -d.funFactor*scaleToValues))(filteredData)}
                        />);
        }
        else return null;
}
    //De lijngrafiek voor moeilijk
    const DiffLineJSX = () => {
        if ((graphOptions.show==="both"||graphOptions.show==="difficulty") && (graphOptions.graphType==="line"||graphOptions.graphType==="lineAndBar")){
        return <path className="difficulty--line"
                            fill="none"
                            stroke="black"
                            strokeWidth="0.5"
                            d={line()
                                .x((d,i) => (i*innerWidth/filteredData.length)+(xOffset*i+innerWidth)/(filteredData.length*2))
                                .y((d => innerHeight -d.difficulty*scaleToValues))(filteredData)}
                        />;
        }
        else return null;
}


    return (
        <div >
        <svg width={width} height={height} className="chartcontainer" >
            <g transform={`translate(${margin.left},${margin.top})`} className="chart">
                <YAxis />
                <XAxis />
                <FunBarJSX />
                <DiffBarJSX />
                <FunLineJSX />
                <DiffLineJSX />
                <text></text>
            </g>
        </svg>
        </div>
    )
}

export default Chart
