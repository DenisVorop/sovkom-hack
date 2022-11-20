import React from 'react'
import styled from 'styled-components/macro'

import CreateDeal from '../create-deal/create-deal'
import InputWithLabel from '../../components/input-with-label/input-with-label'
import { useInput } from '../../hooks/use-input'

import MenuTable from './menu-table'

const Wrapper = styled.div`
    width: 366px;
`

const Content = styled.div`
    width: 366px;
    background: ${({ theme }) => theme.colors.bg.muted};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`

const SearchBlock = styled.div`
    padding: 16px;
    border-left: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    border-right: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
`

const TableWrapper = styled.div`
    height: 180px;
    overflow-y: auto;
`

interface IMenuProps {
    symbolFrom: string
    symbolTo: string
}

const Menu: React.FC<IMenuProps> = ({ symbolFrom, symbolTo }) => {
    const { bind: bindSearch } = useInput('')
    return (
        <Wrapper>
            <Content>
                <SearchBlock>
                    <InputWithLabel
                        placeholder="Поиск"
                        {...bindSearch}
                    />
                </SearchBlock>
                <TableWrapper>
                    <MenuTable />
                </TableWrapper>
                <CreateDeal
                    symbolFrom={symbolFrom}
                    symbolTo={symbolTo}
                />
            </Content>
        </Wrapper>
    )
}

export default React.memo(Menu)
