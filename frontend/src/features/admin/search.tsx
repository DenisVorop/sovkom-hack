import React from 'react'
import styled from 'styled-components/macro'

import Container from '../../components/container/container'
import InputWithLabel from '../../components/input-with-label/input-with-label'
import Title from '../../components/title/title'

import { useMatchMedia } from '../../hooks/use-match-media'
import { titleVariant } from '../../libs/consts'
import { device } from '../../libs/utils/utils'

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.bg.muted};
    padding: 12px 0;
    margin-bottom: 24px;
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
        gap: 24px;
        flex-direction: row;
    }
`

interface ISearchProps {
    title: string
    bind: {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        value: string
    }
}

const Search: React.FC<ISearchProps> = ({ title, bind }) => {
    const { mobile } = useMatchMedia()

    return (
        <Wrapper>
            <Container>
                <Content>
                    <Title variant={titleVariant.H4}>{title}</Title>
                    <InputWithLabel
                        {...bind}
                        placeholder="Поиск"
                        w={mobile ? '100%' : '420px'}
                    />
                </Content>
            </Container>
        </Wrapper>
    )
}

export default React.memo(Search)
