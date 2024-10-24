import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { backgroundColors, borderColors } from '../../A-Datas/chartColors';

// Chart.js의 필요한 부분만 임포트
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({values = {}}) {
	const labels = Object.keys(values)
	const datas = Object.values(values)

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
				display: false,
			},
		},
	}

	return (
		<Line data={data} options={options} />
	)
}

export default LineChart