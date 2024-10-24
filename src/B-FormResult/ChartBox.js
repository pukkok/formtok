import React, { memo } from "react";
import BarChart from "./Chart/BarChart";
import PieChart from "./Chart/PieChart";
import LineChart from "./Chart/LineChart";
import styled from "styled-components";
import DoughnutChart from "./Chart/DoughnutChart";

const StyledChartBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 500px;
`

function ChartBox ({chartType = 'bar', values}) {

    return (
    <StyledChartBox>
        {chartType.includes('bar') && <BarChart isHorizontal={chartType === 'bar-horizontal'} values={values}/>}
        {chartType === 'pie' && <PieChart values={values}/>}
        {chartType === 'line' && <LineChart values={values}/>}
        {chartType === 'doughnut' && <DoughnutChart values={values}/>}
    </StyledChartBox>)
}

export default memo(ChartBox)