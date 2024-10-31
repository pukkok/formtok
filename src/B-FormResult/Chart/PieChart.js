import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { backgroundColors, borderColors, commonCircleOptions } from '../../A-Datas/chartOptions';
import chartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, Tooltip, Legend, chartDataLabels)

function PieChart({values = {}}) {
	const labels = Object.keys(values)
	const datas = Object.values(values)

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

  const options = {...commonCircleOptions}

  return (
      <Pie data={data} options={options} />
  )
}

export default PieChart
