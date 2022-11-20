import React from 'react'
import styled from 'styled-components/macro'

const Textarea = styled.textarea`
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    border-radius: 4px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.fg.default};
    padding: 8px;
    resize: none;
    width: 100%;
    height: 100%;
`

export default React.memo(Textarea)
