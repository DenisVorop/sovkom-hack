import React from 'react'
import styled from 'styled-components/macro'
import Highcharts from 'highcharts/highstock'

import indicatorsAll from 'highcharts/indicators/indicators-all'
import annotationsAdvanced from 'highcharts/modules/annotations-advanced'
import priceIndicator from 'highcharts/modules/price-indicator'
import fullScreen from 'highcharts/modules/full-screen'
import stockTools from 'highcharts/modules/stock-tools'

import { useGraphYahooQuery } from '../../store/services/courses-graph/api'
import { rounding_format } from '../../libs/utils/utils'

import StockChart from './stock'
import ChartWrapper from './chart-wrapper'

indicatorsAll(Highcharts)
annotationsAdvanced(Highcharts)
priceIndicator(Highcharts)
fullScreen(Highcharts)
stockTools(Highcharts)

interface IChartProps {
    stockOptions: any
}

const Chart: React.FC<IChartProps> = ({ stockOptions }) => {
    return (
        <ChartWrapper>
            <StockChart
                options={stockOptions}
                highcharts={Highcharts}
            />
        </ChartWrapper>
    )
}

export default React.memo(Chart)
