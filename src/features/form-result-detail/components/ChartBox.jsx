import { BarIcon, BarIconHorizontal, DoughnutIcon, LineIcon, PieIcon } from "@/components/icons/CustomChartIcons"
import BarChart from "./Chart/BarChart"
import PieChart from "./Chart/PieChart"
import LineChart from "./Chart/LineChart"
import DoughnutChart from "./Chart/DoughnutChart"
import { useState } from "react"

const ChartBox = ({ values ={}}) => {
  const [selectedChartType, setSelectedChartType] = useState('bar')

  const CHART_BUTTONS = [
    {icon : <BarIcon />, type: 'bar-vertical'},
    {icon : <BarIconHorizontal />, type: 'bar-horizontal'},
    {icon : <PieIcon />, type: 'pie'},
    {icon : <DoughnutIcon />, type: 'doughnut'},
    {icon : <LineIcon />, type: 'line'},
  ]

  return (
    <div>
      <div className="flex justify-end gap-1.5">
        <p>차트</p>
        {CHART_BUTTONS.map(button => (
          <button 
            key={button.type} 
            onClick={() => setSelectedChartType(button.type)}
          >
            {button.icon}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center w-full min-h-70 max-h-120">
        {selectedChartType.includes('bar') && <BarChart isHorizontal={selectedChartType === 'bar-horizontal'} values={values}/>}
        {selectedChartType === 'pie' && <PieChart values={values}/>}
        {selectedChartType === 'line' && <LineChart values={values}/>}
        {selectedChartType === 'doughnut' && <DoughnutChart values={values}/>}
      </div>
    </div>
  )
}

export default ChartBox