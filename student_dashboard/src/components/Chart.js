import React from 'react'

const width = 800;
const height = 500;
const centerX = width/2;
const centerY = height/2;
const strokewidth = 20;

const Chart = () => {
    return (
        <svg width={width} height={height}>
            <g>
                <circle 
                    cx={centerX}
                    cy={centerY}
                    r={height/2- strokewidth/2}
                    fill="yellow"
                    stroke="black"
                    stroke-width={strokewidth}
                />
                
            </g>
        </svg>
    )
}

export default Chart
