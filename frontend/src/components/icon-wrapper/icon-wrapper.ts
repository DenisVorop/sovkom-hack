import React from 'react'
import styled from 'styled-components/macro'

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
        cursor: pointer;
    }
    svg path {
        stroke: ${({ theme }) => theme.colors.bg.subtle};
    }
`

export default React.memo(IconWrapper)
