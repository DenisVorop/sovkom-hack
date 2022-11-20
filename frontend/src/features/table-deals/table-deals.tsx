import React from 'react'
import styled from 'styled-components/macro'

import Table from '../../components/table/table'

import { useUserTransactionsAllQuery } from '../../store/services/txs/api'

const TfootInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

const Col = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    > span {
        :last-child {
            font-weight: 700;
            font-size: 14px;
            line-height: 140%;
            color: ${({ theme }) => theme.colors.fg.default};
        }
    }
`

const ColoredSpan = styled.span<{ type: string }>`
    color: ${({ type, theme }) => type === 'buy' ? theme.colors.bg.action2 : theme.colors.bg.action};
`

const TableDeals: React.FC = () => {
    const { data: deals } = useUserTransactionsAllQuery(null, { pollingInterval: 3000 })

    const activeDeals = React.useMemo(() => {
        return deals?.filter((deal => deal.status !== 'closed'))
    }, [deals])

    return (
        <Table>
            <thead>
                <tr>
                    {thArr.map(th => <th key={th}>{th}</th>)}
                </tr>
            </thead>
            <tbody>
                {activeDeals?.map(deal => {
                    const date = new Date(deal.timestamp_open).toLocaleString()
                    return (
                        <tr key={date}>
                            <td>{deal.direction}</td>
                            <td>{deal.instrument}</td>
                            <td>{date}</td>
                            <td>
                                <ColoredSpan type={deal.action}>{deal.action}</ColoredSpan>
                            </td>
                            <td>{deal.amount}</td>
                            <td>{deal.client_open_value}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>+ 0</td>
                            <td></td>
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={9}>
                        <TfootInfo>
                            {tfArr.map(tr => <Col key={tr.tr}>
                                <span>{tr.tr}</span>
                                <span>{tr.info}</span>
                            </Col>)}
                        </TfootInfo>
                    </td>
                    <td>-3.24</td>
                    <td>USD</td>
                </tr>
            </tfoot>
        </Table>
    )
}

export default React.memo(TableDeals)

const tfArr = [
    { tr: 'Balance:', info: '100 000.00' },
    { tr: 'Equity:', info: '0.00' },
    { tr: 'Margin:', info: '0.00' },
    { tr: 'Free:', info: '0.00' },
    { tr: 'Level:', info: '0.00%' },
]

const thArr = [
    'Symbol', 'Ticket', 'Time', 'Type', 'Volume', 'Price', 'S/L', 'T/P', 'Swap', 'Profit', 'Comment',
]
