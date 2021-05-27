import React, { useEffect, useState } from 'react';
import './Chart.css'
import { scaleBand , scaleLinear , line } from 'd3'; 
import { useSelector } from 'react-redux';
import { selectData, selectLoadingStatus ,selectGraphOptions, selectSpecific } from "../features/studentData/studentDataSlice";
import { filterArrayByKey } from '../utils';



const Chart = ({ student }) => {
    const data = useSelector(selectData);
    const specific = useSelector(selectSpecific);
    const graphOptions = useSelector(selectGraphOptions);
    const init = filterArrayByKey(data , "assignment" , specific.select)
    const [filteredData, setFilteredData] = useState(init);

    let loadingStatus = "idle"
    
    loadingStatus = useSelector(selectLoadingStatus);

    useEffect(() => {
        if(loadingStatus==="ready"){
            const specificData = filterArrayByKey(data , "assignment" , specific.select)// DATA van de geselecteerde opdracht
            let sortedAverages = [...specificData];
             if (graphOptions.sort==="normal"){
                setFilteredData(specificData);
             }
             else if (graphOptions.sort==="student") {
                 console.log("no action on sorting the chart")
             }
             else if (graphOptions.sort==="mostfun") {
                sortedAverages = sortedAverages.sort((a,b) => b.funFactor -a.funFactor);
                setFilteredData(sortedAverages);
             }
             else {
                 sortedAverages = sortedAverages.sort((a,b) => b.difficulty -a.difficulty);
                 setFilteredData(sortedAverages);
            }
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
                    <line  x2={innerWidth} stroke="lightgrey" strokeWidth="0.2"/>
                    <text style={{textAnchor:"end"}} dy=".5em" x="-.5em">{tickValue}</text>
                </g>)
                );
    }

    //De x-as elementen
    const XAxis = () => {
    return <g className="xTicks">
            {xScale.domain().map(tickValue => (
                <g key={`${tickValue}x`} transform={`translate(${xScale(tickValue) + innerWidth/(filteredData.length*2) -10},0) `}>
                    <text className="bigText" transform={`rotate(315)`} style={{textAnchor:"end"}} x={-margin.left } y={innerHeight*Math.sqrt(2)}>{tickValue}</text>
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
                    x={xScale(d.student) + innerWidth/(filteredData.length*2)} 
                    y={ innerHeight-d.difficulty*scaleToValues} 
                    width={(innerWidth/(filteredData.length*2.5))} 
                    height={d.difficulty*scaleToValues} 
                    className="difficulty--bar"
                    strokeWidth="0.25"
                    > <title>
                            {d.assignment} Moeilijkheid: {(Math.round(d.difficulty*100))/100}
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
                            strokeWidth="0.75"
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
                            strokeWidth="0.75"
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
                <text className="bigText" x={innerWidth/2} y={height- margin.bottom/2 } >Opdracht :{filteredData[0].assignment}</text>
            </g>
        </svg>
        </div>
    )
}

export default Chart
