import React from 'react'
import styled from 'styled-components/macro'

import Container from '../../components/container/container'
import Title from '../../components/title/title'

import { titleVariant } from '../../libs/consts'
import { device } from '../../libs/utils/utils'

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.bg.default};
    padding: 12px 0;
    margin-bottom: 12px;
`

const Content = styled.div`
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    width: 100%;
    gap: 12px;

    @media ${device.tabletM} {
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        flex-direction: row;
    }
`

const CountOfAccounts = styled.span`
    color: ${({ theme }) => theme.colors.bg.subtle};
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 120%;
    margin-left: 4px;
`

interface IHeadProps {
    title: string
    count?: number
    withBtn?: boolean
    children?: React.ReactNode
}

const Head: React.FC<IHeadProps> = ({
    title,
    count,
    withBtn = true,
    children,
}) => {
    return (
        <Wrapper>
            <Container>
                <Content>
                    <Title variant={titleVariant.H4}>{title} <CountOfAccounts>{count}</CountOfAccounts></Title>
                    {withBtn && children}
                </Content>
            </Container>
        </Wrapper>
    )
}

export default React.memo(Head)
