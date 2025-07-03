import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { backgroundColors, borderColors, commonCircleOptions } from './chartOptions';
import chartDataLabels from 'chartjs-plugin-datalabels'
import { useScreenStore } from '@/stores/useScreenStore';

ChartJS.register(ArcElement, Tooltip, Legend, chartDataLabels)

const PieChart = ({values = {}}) => {
	const labels = Object.keys(values)
	const datas = Object.values(values)
	const mode = useScreenStore(s => s.mode)

	const data = {
		responsive: true, // 반응형으로 차트를 설정
		labels: labels,
		datasets: [
			{
				label: ' ',
				data: datas,
				backgroundColor: backgroundColors,
				borderColor: borderColors,
				tension: 0.4,
			},
		],
	}

  const options = commonCircleOptions(mode)

  return (
      <Pie data={data} options={options} />
  )
}

export default PieChart
