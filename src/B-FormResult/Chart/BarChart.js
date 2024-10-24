import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { backgroundColors, borderColors, commonLineBarOptions } from '../../A-Datas/chartOptions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function BarChart({isHorizontal = false ,values={}}) {
    const labels = Object.keys(values)
    const datas = Object.values(values)
    const max = Math.max(...datas)
    const data = {
        responsive: true, // 반응형으로 차트를 설정
        labels: labels,
        datasets: [
            {
                label: ' ',
                data: datas,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    }
    const commonOptions = commonLineBarOptions(max, isHorizontal)
    const options = {
        ...commonOptions,
        indexAxis : isHorizontal ? 'y' : 'x',
        maxBarThickness: 200 // 최대 bar의 두께
    }

    return (
        <Bar data={data} options={options} />
    )
}

export default BarChart