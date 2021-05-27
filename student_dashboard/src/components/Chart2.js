import React, { useEffect, useState } from 'react';
import './Chart.css'
import { scaleBand , scaleLinear , line } from 'd3'; 
import { useSelector } from 'react-redux';
import { selectAverageArray, selectData,  selectLoadingStatus ,selectGraphOptions } from "../features/studentData/studentDataSlice";

const Chart2 = ({ student }) => {
    const data = useSelector(selectData);
    const averages = useSelector(selectAverageArray);
    const graphOptions = useSelector(selectGraphOptions);
    const [filteredData, setFilteredData] = useState(averages);

    let loadingStatus = "idle"
    
    loadingStatus = useSelector(selectLoadingStatus);

    useEffect(() => {
        if( typeof student!=="undefined"){
            let sortedAverages = data.filter(d => d.student===student)
            if (graphOptions.sort==="normal"){
                setFilteredData(data.filter(d => d.student===student));
             }
             else if (graphOptions.sort==="mostfun") {
                sortedAverages = sortedAverages.sort((a,b) => b.funFactor -a.funFactor);
                setFilteredData(sortedAverages);
             }
             else if (graphOptions.sort==="student"){
                setFilteredData(data.filter(d => d.student===student));
             }
             else {
                 sortedAverages = sortedAverages.sort((a,b) => b.difficulty -a.difficulty);
                 setFilteredData(sortedAverages);
            }
        }
        else if(loadingStatus==="ready"){
            let sortedAverages = [...averages];
             if (graphOptions.sort==="normal"){
                setFilteredData(averages);
             }
             else if (graphOptions.sort==="mostfun") {
                sortedAverages = sortedAverages.sort((a,b) => b.funFactor -a.funFactor);
                setFilteredData(sortedAverages);
             }
             else if (graphOptions.sort==="mostdifficult") {
                 sortedAverages = sortedAverages.sort((a,b) => b.difficulty -a.difficulty);
                 setFilteredData(sortedAverages);
            }
            else console.log("no sorting done")
         };
    },[data , averages, loadingStatus, graphOptions, student])

    

    
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

    //De y-as elementen
    const YAxis = () => { 
        return yScale.ticks(10).map(tickValue => (
                <g key={`${tickValue}y`} transform={`translate(0, ${yScale(tickValue)})`}>
                    <line  x2={innerWidth} stroke="lightgrey" strokeWidth="0.25"/>
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

    //De staafgrafiek voor leuk
    const FunBarJSX = () => {
        if ((graphOptions.show==="both"||graphOptions.show==="funFactor") && (graphOptions.graphType==="bar"||graphOptions.graphType==="lineAndBar")) {
            return filteredData.map((d,i) => (
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

    //De legenda
    const Legend = () => {
        return (
        <>
            <g>
            <rect
                className="funFactor--legend"
                x="-35"
                y={innerHeight/2}
                width="3"
                height="3"
                strokeWidth="0.25"
            ></rect>
            <text x="-30" y={innerHeight/2 + 3} >Fun Factor</text>
            </g>
            <g>
            <rect
                className="difficulty--legend"
                x="-35"
                y={(innerHeight/2)+ 10}
                width="3"
                height="3"
                strokeWidth="0.25"
            ></rect>
            <text x="-30" y={(innerHeight/2) + 13}>Moeilijkheid</text>
            </g>
        </>)
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
                <Legend />
                <text x={innerWidth/2}>Gemiddelde Waarden per Opdracht</text>
            </g>
        </svg>
        </div>
    )
}

export default Chart2
