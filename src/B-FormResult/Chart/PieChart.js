import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { backgroundColors, borderColors } from '../../A-Datas/chartColors';
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
				label: [labels],
				data: datas,
				backgroundColor: backgroundColors,
				borderColor: borderColors,
				tension: 0.4,
			},
		],
	}

  const options = {
    responsive: true,
    plugins: {
		legend: {
			position: 'right',
			labels: {
				font: {
					size: 14,
				},
				color: '#fff'
			}
		},
		title: {
			display: false,
		},
		datalabels : {
			display: true,
			color: '#fff', // 데이터 레이블 텍스트 색상
			font: {
				size: 15, // 폰트 크기
			},
			formatter: (value, context) => {
				return `${value}` // 레이블 포맷 (예: 50%)
			},
		}
    },
  }

  return (
      <Pie data={data} options={options} />
  )
}

export default PieChart
