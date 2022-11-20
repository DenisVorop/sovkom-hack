import React from 'react'
import styled from 'styled-components/macro'

import { textVariant, titleVariant } from '../../libs/consts'

import OverflowText from '../overflow-text/overflow-text'
import Text from '../text/text'
import Title from '../title/title'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    border-radius: 4px;
`

const ImageWrapper = styled.div`
    width: 100%;
    height: 146px;
    background-color: ${({ theme }) => theme.colors.additional.gray};
    border-radius: 4px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 12px;
`

const Date = styled.span`
    color: ${({ theme }) => theme.colors.bg.subtle};
`

interface ICardProps { }

const Card: React.FC<ICardProps> = () => {
    return (
        <Wrapper>
            <ImageWrapper>
                <img src="" alt="img" />
            </ImageWrapper>
            <Content>
                <Text variant={textVariant.T3}><Date>21.09.2022</Date></Text>
                <Title variant={titleVariant.H5}>Заголовок новости</Title>
                <OverflowText variant={textVariant.T2} lines={3}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                </OverflowText>
            </Content>
        </Wrapper>
    )
}

export default React.memo(Card)
