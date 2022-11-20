import React from 'react'
import styled from 'styled-components/macro'

import cards from '../../assets/images/cards.png'

import Text from '../../components/text/text'

import { textVariant } from '../../libs/consts'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const ImageWrapper = styled.div<{ isActive: boolean }>`
    padding: 24px;
    border: ${({ theme, isActive }) => `1px solid  ${isActive ? theme.colors.bg.action2 : theme.colors.border.default}`};
    border-radius: 4px;
    max-width: 345px;
    max-height: 80px;
    transition: border 0.3s ease 0s;
    :hover {
        cursor: pointer;
    }
    img {
        width: 100%;
        height: auto;
    }
`

interface ICardsCardProps {
    onToggle: () => void
    isSelected: boolean
}

const CardsCard: React.FC<ICardsCardProps> = ({
    onToggle,
    isSelected,
}) => {
    return <Wrapper>
        <Text variant={textVariant.T2}>Оплатить с помощью</Text>
        <ImageWrapper isActive={isSelected} onClick={onToggle}>
            <img src={cards} alt="cards" />
        </ImageWrapper>
    </Wrapper>
}

export default React.memo(CardsCard)
