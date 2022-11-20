import React from 'react'
import styled from 'styled-components/macro'

import { textVariant } from '../../libs/consts'
import { device } from '../../libs/utils/utils'

interface ITextProps {
    variant: string
    color?: string
    secondary?: boolean
}
const Text = styled.div<ITextProps>`
    font-style: normal;
    font-weight: 400;

    ${({ variant }) => {
        switch (variant) {
            case textVariant.T1: return { fontSize: '16px', lineHeight: '130%' }
            case textVariant.T2: return { fontSize: '14px', lineHeight: '130%' }
            case textVariant.T3: return { fontSize: '14px', lineHeight: '130%' }
        }
    }}
    @media ${device.tabletM} {
        ${({ variant }) => {
        switch (variant) {
            case textVariant.T1: return { fontSize: '16px', lineHeight: '130%' }
            case textVariant.T2: return { fontSize: '14px', lineHeight: '130%' }
            case textVariant.T3: return { fontSize: '14px', lineHeight: '130%' }
        }
    }}
    }
    @media ${device.laptopM} {
        ${({ variant }) => {
        switch (variant) {
            case textVariant.T1: return { fontSize: '18px', lineHeight: '140%' }
            case textVariant.T2: return { fontSize: '16px', lineHeight: '140%' }
            case textVariant.T3: return { fontSize: '14px', lineHeight: '140%' }
        }
    }}
    }

    ${({ secondary, theme }) => {
        return secondary && { color: theme.colors.bg.subtle }
    }}
`

export default React.memo(Text)
