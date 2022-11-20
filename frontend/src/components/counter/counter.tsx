import React from 'react'
import styled from 'styled-components/macro'

import { MinusIcon, PlusIcon } from '../../assets/images/_images'

import IconWrapper from '../icon-wrapper/icon-wrapper'

const Wrapper = styled.div`
    background: ${({ theme }) => theme.colors.bg.default};
    border-radius: 4px;
    width: 100%;
    color: ${({ theme }) => theme.colors.fg.default};
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    user-select: none;
`

const StyledInput = styled.input<{ w: number }>`
    background-color: transparent;
    color: inherit;
    width: ${({ w }) => w ? (w * 10) : (1 * 10)}px;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    :hover { background-color: transparent; }
    &&:focus { background-color: transparent; }
`

interface ICounterProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

const Counter: React.FC<ICounterProps> = ({
    onChange,
    value,
}) => {
    const increment = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = String(+(value || 0) + 1)
        onChange(e)
    }, [value, onChange])

    const decrement = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value === 0) {
            onChange(e)
        }
        e.target.value = String(+(value || 0) - 1)
        onChange(e)
    }, [value, onChange])

    return (
        <Wrapper>
            <IconWrapper onClick={decrement}>
                <MinusIcon />
            </IconWrapper>
            <StyledInput
                type="number"
                w={value.length}
                value={value ? value : ''}
                onChange={onChange}
            />
            <IconWrapper onClick={increment}>
                <PlusIcon />
            </IconWrapper>
        </Wrapper>
    )
}

export default React.memo(Counter)
