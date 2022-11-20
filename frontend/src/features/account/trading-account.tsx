import React from 'react'
import styled from 'styled-components/macro'

import Button from '../../components/button/button'
import { buttonVariant } from '../../libs/consts'
import { rounding_format } from '../../libs/utils/utils'
import { TAccount } from '../../types/types'

const Wrapper = styled.div`
    padding: 16px;
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Content = styled.div`
    display: flex;
    gap: 108px;
`

const InfoBLock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    > div {
        :first-child {
            font-weight: 700;
            display: flex;
            align-items: end;
            gap: 4px;
            > span {
                :last-child {
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 140%;
                    color: ${({ theme }) => theme.colors.bg.subtle};
                }
            }
        }
        :last-child {
            font-size: 16px;
            line-height: 140%;
            color: ${({ theme }) => theme.colors.bg.subtle};
        }
    }
`

const Actions = styled.div`

`

interface ITradingAccountProps {
    acc: TAccount
}

const TradingAccount: React.FC<ITradingAccountProps> = ({
    acc,
}) => {
    return (
        <Wrapper>
            <Content>
                <InfoBLock>
                    <div>{acc.id}</div>
                    <div>{acc.type} | 1:{acc.leverage}</div>
                </InfoBLock>
                <InfoBLock>
                    <div>
                        <span>{rounding_format(acc.balance, 2, '.', '')}</span>
                        <span>RUB</span>
                    </div>
                    <div>Баланс</div>
                </InfoBLock>
                <InfoBLock>
                    <div>
                        <span>-</span>
                        <span>RUB</span>
                    </div>
                    <div>Эквити</div>
                </InfoBLock>
            </Content>
            <Actions>
                <Button variant={buttonVariant.SELL}>Пополнить</Button>
            </Actions>
        </Wrapper>
    )
}

export default React.memo(TradingAccount)
