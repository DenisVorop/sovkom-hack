import React from 'react'
import styled from 'styled-components/macro'

const Input = styled.input`
    padding: 8px;
    background: ${({ theme }) => theme.colors.bg.default};
    border-radius: 4px;
    width: 100%;
    color: ${({ theme }) => theme.colors.fg.default};
    border: ${({ theme }) => `1px solid ${theme.colors.bg.default}`};
    min-height: 40px;
    transition: all 0.3s ease 0s;

    ::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 130%;
        color: ${({ theme }) => theme.colors.bg.subtle}
    }
    :hover:not(:focus) {
        filter: brightness(90%);
    }
    :focus-visible, :focus {
        border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
        outline: none;
    }
    :disabled {
        border: 0;
        background: ${({ theme }) => theme.colors.border.default};
        color: ${({ theme }) => `1px solid ${theme.colors.fg.default}`};
        ::placeholder {
            color: ${({ theme }) => `1px solid ${theme.colors.bg.subtle}`};
        }
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

export default React.memo(Input)
