import React from 'react'
import styled from 'styled-components/macro'

import Chart from '../../features/highchart/highchart'
import Menu from '../../features/menu/menu'
import TableDeals from '../../features/table-deals/table-deals'

import { rounding_format } from '../../libs/utils/utils'
import { useGraphYahooQuery } from '../../store/services/courses-graph/api'

const Layout = styled.div`
    display: flex;
    flex-direction: column;
`

const FlexBlock = styled.div`
    display: flex;
    > div:first-child {
        flex: 1 1 auto;
    }
`

const Stock: React.FC = () => {
    const { data } = useGraphYahooQuery({})

    const graphSeries: number[][] = React.useMemo(() => data?.timestamp?.map((_: unknown, idx: number) => {
        return [
            // [time, open, high, low, close]
            data?.timestamp?.[idx],
            +rounding_format(data?.indicators?.quote?.[0]['open'][idx], 5, '.', ''),
            +rounding_format(data?.indicators?.quote?.[0]['high'][idx], 5, '.', ''),
            +rounding_format(data?.indicators?.quote?.[0]['low'][idx], 5, '.', ''),
            +rounding_format(data?.indicators?.quote?.[0]['close'][idx], 5, '.', ''),
        ]
    }), [data])

    const stockOptions = React.useMemo(() => {
        return {
            yAxis: [{
                opposite: true,
                crosshair: {
                    label: {
                        enabled: true,
                    },
                },
            },
            ],
            xAxis: [{
                startOnTick: false,
                minPadding: 1,
            }],
            series: [{
                data: graphSeries?.length > 0 ? graphSeries : [[0, 0, 0, 0, 0]],
                type: 'ohlc',
                name: data?.meta?.symbol,
                id: data?.meta?.symbol,
            }],
            rangeSelector: {
                buttons: [{
                    type: 'day',
                    count: 1,
                    text: '24 ч.',
                }, {
                    type: 'day',
                    count: 2,
                    text: '48 ч.',
                }, {
                    type: 'day',
                    count: 5,
                    text: '5 д.',
                }, {
                    type: 'month',
                    count: 1,
                    text: '1 мес.',
                }, {
                    type: 'month',
                    count: 3,
                    text: '3 мес.',
                }, {
                    type: 'month',
                    count: 6,
                    text: '6 мес.',
                }, {
                    type: 'ytd',
                    text: 'YTD',
                }, {
                    type: 'year',
                    count: 1,
                    text: '1 год',
                }, {
                    type: 'all',
                    text: 'Все',
                }],
            },
        }
    }, [graphSeries, data])

    const [symbolFrom, symbolTo] = React.useMemo(() => {
        return [data?.meta?.currency, 'USD']
    }, [data?.meta?.currency])

    return <Layout>
        <FlexBlock>
            <Chart
                stockOptions={stockOptions}
            />
            <Menu
            symbolFrom={symbolFrom}
            symbolTo={symbolTo}
            />
        </FlexBlock>
        <TableDeals />
    </Layout>
}

export default React.memo(Stock)
