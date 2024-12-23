'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
// import useWebSocket from 'react-use-websocket'
import PlotlyCard from './plotly-card'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
// import PlotlyPlot from './plotly-plot'

const ResponsiveGridLayout = WidthProvider(Responsive)

// const WS_URL = 'wss://2ms2ts.dev:9696'
// const WS_URL = 'ws://localhost:8002'

export function DraggableGraphArea({isDraggable, children}: {isDraggable: boolean, children: React.ReactNode}) {
  const [layouts, setLayouts] = useState({})
  const [draggable, setDraggable] = useState(isDraggable)

  // const onLayoutChange = useCallback((layout: any, layouts: any) => {
  //   setLayouts(layouts)
  // }, [])

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      // onLayoutChange={onLayoutChange}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      isResizable={draggable}
      isDraggable={draggable}
    >
      <div data-grid={{ x: 0, y: 0, w: 6, h: 3, minW: 3, minH: 2 }}>
        {/* <PlotlyCard title="SPY" /> */}
        {children}
      </div>
    </ResponsiveGridLayout>
  )
}