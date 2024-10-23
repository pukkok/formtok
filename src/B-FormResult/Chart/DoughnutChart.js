import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js의 필요한 부분만 임포트
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DoughnutChart({values = {}}) {
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

	// 차트 데이터
	const data = {
		responsive: true, // 반응형으로 차트를 설정
		labels: labels,
		datasets: [
		{
			label: [labels],
			data: datas,
			backgroundColor: backgroundColors,
			borderColor: borderColors,
			fill: true, // 배경색 채우기
			tension: 0.4, // 선의 부드러움 정도
		},
		],
	}

	// 차트 옵션
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'top', // 'top', 'bottom', 'left', 'right' 가능
			},
			title: {
				display: true,
				text: 'Monthly Sales Data',
			},
		},
	}

	return (
		<Doughnut data={data} options={options} />
	)
}

export default DoughnutChart