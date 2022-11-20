import React from 'react'
import styled from 'styled-components/macro'

import Table from '../../components/table/table'
import { useTheme } from '../../hooks/use-theme'

const thead = ['Symbol', 'Bid', 'Ask', 'Chg %']

const MenuTable: React.FC = () => {
    const { theme } = useTheme()
    return (
        <Table stickyHead headColor={theme.colors.bg.default}>
            <thead>
                <tr>
                    {thead.map(th => <th key={th}>{th}</th>)}
                </tr>
            </thead>
            <tbody>
                {[...new Array(7).keys()].map((_, index) => (
                    <tr key={`${index}_${new Date().getTime()}`}>
                        <td>USDRUB</td>
                        <td>0.98386</td>
                        <td>0.98386</td>
                        <td>-0.25%</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default React.memo(MenuTable)
