import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { backgroundColors, borderColors } from '../../A-Datas/chartColors';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function BarChart({isHorizontal = false ,values={}}) {
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
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        indexAxis : isHorizontal ? 'y' : 'x',
        plugins: {
            legend: {
                display: false,
                // position: 'top',
                labels: {
                    color: '#ffffff', // label 색상
                    font: {
                        size: 14, // label 폰트 크기 설정
                    }
                },
            },
            title: {
                display: false,
                text: '설문 결과',
                color: '#ededed',
                font : {
                    size : 20
                }
            },
            datalabels: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks : {
                    stepSize : 1,
                    color: '#eee',
                    font: {
                        size: 16
                    }
                },
                grid: {
                    color: '#666', // y축 그리드 라인 색상 설정
                },
            },
            x: {
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
        },
        maxBarThickness: 200 // 최대 bar의 두께
    }

    return (
        <Bar data={data} options={options} />
    )
}

export default BarChart