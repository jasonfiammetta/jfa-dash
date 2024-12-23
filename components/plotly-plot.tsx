"use client"

import React, { useState } from 'react'
import dynamic from "next/dynamic"

const _Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

// export interface PlotlyDataProps {
//   data: {
//     x: number[],
//     y: number[],
//   }
// }

export interface PlotProps {
  title: string,
}


export default function Plot({title}: PlotProps) { //{ data }: PlotlyDataProps) {
  
  // const [graphData, setGraphData] = useState({
  //   graph1: { x: [1, 2, 3], y: [6, 3, 5] },
  // })

  return (
    <>
      <_Plot
        data={[
          {
            type: 'candlestick',
            open: [],
            close: [],
            high:[],
            low: [],
            // x: data.x,
            // y: data.y,
            // mode: 'lines+markers',
            // marker: { color: 'red' },
          },
        ]}
        layout={{
          title: title,
          dragmode: 'zoom',
          autosize: true,
          margin: { l: 30, r: 10, b: 30, t: 10, pad: 0 },
          xaxis: {
            autorange: true,
          },
          yaxis: {
            autorange: true,
            type: 'linear'
          }
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ responsive: true }}
      />
    </>
  );

}
