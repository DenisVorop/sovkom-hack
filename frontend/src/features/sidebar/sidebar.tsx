import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import A from '../../components/link/link'
import Button from '../../components/button/button'
import Title from '../../components/title/title'
import Text from '../../components/text/text'

import { buttonVariant, path, sidebarLinks, textVariant, titleVariant } from '../../libs/consts'
import { useUserAccountsQuery } from '../../store/services/txs/accounts/api'

const Wrapper = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    min-width: 170px;
    width: 170px;
    max-width: 170px;
    height: calc(100vh - 57px);
    display: flex;
    flex-direction: column;
    //flex: 1 1 auto;
    justify-content: space-between;
    border-right: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    background-color: ${({ theme }) => theme.colors.bg.muted};
`

const Links = styled.div`
    display: flex;
    flex-direction: column;
`

const Link = styled.div <{ isActive: boolean }>`
    padding: 12px;
    color: ${({ theme }) => theme.colors.bg.action2};
    background: ${({ isActive, theme }) => isActive ? theme.colors.bg.default : 'transparent'};
    font-size: 18px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    div svg path {
        stroke: ${({ theme }) => theme.colors.bg.action2};
    }
`

const TotalBalanceWrapper = styled.div`
    padding: 12px;
`

const TotalBalance = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px;
    margin-bottom: 12px;
    background: ${({ theme }) => theme.colors.bg.default};
`

const TotalBalanceCoin = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 0;
    gap: 4px;
`

const Sidebar: React.FC = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { data: accounts } = useUserAccountsQuery(null)

    const balance = React.useMemo(() => {
        return accounts?.reduce((acc, i) => {
            return acc + i.balance
        }, 0)
    }, [accounts])

    const handleNavigateToInvoice = React.useCallback(() => {
        navigate(path.INVOICE)
    }, [])

    return (
        <Wrapper>
            <Links>
                {sidebarLinks.map(link => (
                    <A to={link.path} key={link.path}>
                        <Link isActive={pathname === link.path}>
                            <div>{link.icon}</div>
                            <div>{link.link}</div>
                        </Link>
                    </A>
                ))}
            </Links>
            <TotalBalanceWrapper>
                <TotalBalance>
                    <Text variant={textVariant.T2} secondary>Общий баланс</Text>
                    <TotalBalanceCoin>
                        <Title variant={titleVariant.H4}>{balance}</Title>
                        <Text variant={textVariant.T3} secondary>RUB</Text>
                    </TotalBalanceCoin>
                    <TotalBalanceCoin>
                        <Title variant={titleVariant.H4}>130.00</Title>
                        <Text variant={textVariant.T3} secondary>USD</Text>
                    </TotalBalanceCoin>
                </TotalBalance>
                <Button
                    variant={buttonVariant.SELL}
                    onClick={handleNavigateToInvoice}
                >
                    Пополнить
                </Button>
            </TotalBalanceWrapper>
        </Wrapper>
    )
}

export default React.memo(Sidebar)
