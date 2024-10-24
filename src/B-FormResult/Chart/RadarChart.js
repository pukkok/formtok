import React from 'react'
import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

function RadarChart({ values = {} }) {
    const labels = Object.keys(values)
    const datas = Object.values(values)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Score',
                data: datas,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            },
        ],
    }

    const options = {
        responsive: true,
        scales: {
            r: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    }

    return <Radar data={data} options={options} />
}

export default RadarChart