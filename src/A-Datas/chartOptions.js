const backgroundColors = [
	'rgba(255, 99, 132, 0.2)',   // 빨강
	'rgba(54, 162, 235, 0.2)',   // 파랑
	'rgba(255, 206, 86, 0.2)',   // 노랑
	'rgba(75, 192, 192, 0.2)',   // 청록색
	'rgba(153, 102, 255, 0.2)',  // 보라
	'rgba(255, 159, 64, 0.2)',   // 오렌지
	'rgba(201, 203, 207, 0.2)',  // 회색
	'rgba(255, 87, 34, 0.2)',    // 진한 오렌지
	'rgba(103, 58, 183, 0.2)',   // 진한 보라
	'rgba(0, 188, 212, 0.2)',    // 옅은 청록색
	'rgba(139, 195, 74, 0.2)',   // 연두
	'rgba(233, 30, 99, 0.2)',    // 진한 핑크
	'rgba(255, 235, 59, 0.2)',   // 밝은 노랑
	'rgba(96, 125, 139, 0.2)',   // 회색 블루톤
	'rgba(205, 220, 57, 0.2)',   // 연두/올리브
	'rgba(156, 39, 176, 0.2)',   // 진한 보라/핑크
	'rgba(63, 81, 181, 0.2)',    // 남색
	'rgba(0, 150, 136, 0.2)',    // 짙은 청록색
	'rgba(244, 67, 54, 0.2)',    // 진한 빨강
	'rgba(121, 85, 72, 0.2)'     // 갈색
]

const borderColors = [
	'rgba(255, 99, 132, 1)',   // 빨강
	'rgba(54, 162, 235, 1)',   // 파랑
	'rgba(255, 206, 86, 1)',   // 노랑
	'rgba(75, 192, 192, 1)',   // 청록색
	'rgba(153, 102, 255, 1)',  // 보라
	'rgba(255, 159, 64, 1)',   // 오렌지
	'rgba(201, 203, 207, 1)',  // 회색
	'rgba(255, 87, 34, 1)',    // 진한 오렌지
	'rgba(103, 58, 183, 1)',   // 진한 보라
	'rgba(0, 188, 212, 1)',    // 옅은 청록색
	'rgba(139, 195, 74, 1)',   // 연두
	'rgba(233, 30, 99, 1)',    // 진한 핑크
	'rgba(255, 235, 59, 1)',   // 밝은 노랑
	'rgba(96, 125, 139, 1)',   // 회색 블루톤
	'rgba(205, 220, 57, 1)',   // 연두/올리브
	'rgba(156, 39, 176, 1)',   // 진한 보라/핑크
	'rgba(63, 81, 181, 1)',    // 남색
	'rgba(0, 150, 136, 1)',    // 짙은 청록색
	'rgba(244, 67, 54, 1)',    // 진한 빨강
	'rgba(121, 85, 72, 1)'     // 갈색
]

const commonCircleOptions = {
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
				return value === 0 ? ' ' : `${value}`
			},
		}
	},
}

const commonLineBarOptions = (max, isHorizontal = false) => {
	return {
		responsive: true,
		// maintainAspectRatio: false, // 부모 요소에 맞게 크기를 조정
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
			datalabels: {
				display: false
			}
		},
		scales: {
			y: {
				max: isHorizontal ? undefined : Math.ceil(max * 3 / 2),
				beginAtZero: true,
				ticks : {
					stepSize : 1,
					color: '#eee',
					font: {
						size: 16
					}
				},
				grid: {
					color: '#666', 
				},
			},
			x: {
				max: isHorizontal ? Math.ceil(max * 3 / 2) : undefined,
				ticks : {
					stepSize : 1,
					color: '#eee',
					font: {
						size: 15
					}
				},
				grid: {
					color: '#888', // x축 그리드 라인 색상 설정
				},
			}
		}
	}
}


export { backgroundColors, borderColors, commonCircleOptions, commonLineBarOptions }