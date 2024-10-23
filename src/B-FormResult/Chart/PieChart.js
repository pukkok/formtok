import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend)

function PieChart({values = {}}) {
	const labels = Object.keys(values)
    const datas = Object.values(values)

	const backgroundColors = [
		'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
		'rgba(255, 206, 86, 0.2)',
		'rgba(75, 192, 192, 0.2)',
		'rgba(153, 102, 255, 0.2)',
		'rgba(255, 159, 64, 0.2)',
	]
	const borderColors = [
		'rgba(255, 99, 132, 1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255, 206, 86, 1)',
		'rgba(75, 192, 192, 1)',
		'rgba(153, 102, 255, 1)',
		'rgba(255, 159, 64, 1)',
	]


	const data = {
		responsive: true, // 반응형으로 차트를 설정
		// maintainAspectRatio: false, // 부모 요소에 맞게 크기 비율을 유지하지 않음
		labels: labels,
		datasets: [
			{
				label: [labels],
				data: datas,
				backgroundColor: backgroundColors,
				borderColor: borderColors,
				borderWidth: 1,
			},
		],
	}

  const options = {
    responsive: true,
    plugins: {
		legend: {
			// display: false,
			position: 'top',
		},
		title: {
			display: true,
			text: '설문 결과',
		},
    },
  }

  return (
      <Pie data={data} options={options} />
  )
}

export default PieChart
