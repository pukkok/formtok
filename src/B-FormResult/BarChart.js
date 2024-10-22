import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function BarChart({values={}}) {
    const labels = Object.keys(values)
    const datas = Object.values(values)

    // ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']

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

    // const data = {
    //     labels: labels,
    //     datasets: labels.map((label, idx) => ({
    //         label: label, // 각 항목의 라벨
    //         data: [datas[idx]], // 각 항목에 해당하는 데이터 (단일 값 배열로 감쌈)
    //         backgroundColor: backgroundColors[idx % backgroundColors.length], // 랜덤 색상
    //         borderColor: borderColors[idx % borderColors.length],
    //         borderWidth: 1,
    //     }))
    // }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                // position: 'top',
            },
            title: {
                display: true,
                text: '설문 결과',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks : {
                    stepSize : 1
                }
            },
        }
    }

    return (
        <div>
        <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart