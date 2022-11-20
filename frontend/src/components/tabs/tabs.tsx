import React from 'react'
import styled from 'styled-components/macro'

import { buttonVariant, textVariant } from '../../libs/consts'

import Button from '../button/button'
import Text from '../text/text'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const List = styled.div<{ w?: string }>`
    background: ${({ theme }) => theme.colors.bg.default};
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 4px;
    width: ${({ w }) => w ? w : '100%'};
`

const Tab = styled(Button).attrs((props) => ({
    ...props,
}))
    `
    padding: 4px 8px;
`

interface ITabsProps {
    arr: string[]
    w?: string
    index: number
    toggleTab: (e: React.MouseEvent<HTMLDivElement>, idx: number) => void
    description?: string
}

const Tabs: React.FC<ITabsProps> = ({
    arr = [],
    w,
    index,
    toggleTab,
    description,
}) => {
    return <Wrapper>
        {description && <Text variant={textVariant.T3}>{description}</Text>}
        <List w={w}>
            {arr.map((i, idx) => <Tab
                variant={(index === idx) && buttonVariant.SELL}
                key={i}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => toggleTab(e, idx)}
            >
                {i}
            </Tab>)}
        </List>
    </Wrapper>
}

export default React.memo(Tabs)
