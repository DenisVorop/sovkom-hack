import React from 'react'
import styled from 'styled-components/macro'

import { buttonVariant } from '../../libs/consts'


interface IButtonProps {
    w?: string
    variant: string
    size?: string
    small?: boolean
}


const Button = styled.button<IButtonProps>`
    transition: all 0.3s ease 0s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    white-space: nowrap;

    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    border-radius: 4px;
    padding: 10px 24px;
    width: ${({ w }) => w ? w : '100%'};

    ${({ variant, theme }) => {
        switch (variant) {
            case buttonVariant.PRIMARY: {
                return { color: '', backgroundColor: '' }
            }
            case buttonVariant.SECONDARY: {
                return { color: '', backgroundColor: 'transparent' }
            }
            case buttonVariant.TEXT: {
                return { padding: '0px', border: 'none', width: 'fit-content', fontFamily: 'inherit', color: theme.colors.bg.action }
            }
            case buttonVariant.SELL: {
                return { backgroundColor: theme.colors.bg.action, color: '#F9F9F9' }
            }
            case buttonVariant.BUY: {
                return { backgroundColor: theme.colors.bg.action2, color: '#F9F9F9' }
            }
        }
    }}
    :hover {
        cursor: pointer;
        filter: brightness(90%);
    }
    :disabled {
        cursor: not-allowed;
        color: ${({ theme }) => theme.colors.bg.subtle};
        background-color: ${({ theme }) => theme.colors.bg.muted};
    }
    :active {
        filter: brightness(80%);
    }

    ${({ small }) => small && {
        padding: '4px 8px',
    }}
`

export default React.memo(Button)
