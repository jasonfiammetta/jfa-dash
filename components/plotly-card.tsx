"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Plot from './plotly-plot'

export interface CardProps {
  title: string;
}

export default function PlotlyCard({ title }: CardProps) {
  // console.log(data)
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Plot title={title}/>
      </CardContent>
    </Card>
  )
}