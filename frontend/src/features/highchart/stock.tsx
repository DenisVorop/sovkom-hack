import React from 'react'
import HighchartsReact from 'highcharts-react-official'

const StockChart = ({ options, highcharts }) => <HighchartsReact
        highcharts={highcharts}
        constructorType="stockChart"
        options={options}
        containerProps={{ style: { height: '100%' } }}
    />

export default React.memo(StockChart)
