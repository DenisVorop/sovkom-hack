import React from 'react'
import styled from 'styled-components/macro'

import { titleVariant } from '../../libs/consts'
import { device } from '../../libs/utils/utils'

interface ITitleProps {
    variant: string
    color?: string
}
const Title = styled.div<ITitleProps>`
    font-style: normal;
    font-weight: 700;

    ${({ variant }) => {
        switch (variant) {
            case titleVariant.H1: return { fontSize: '24px', lineHeight: '110%' }
            case titleVariant.H2: return { fontSize: '20px', lineHeight: '120%' }
            case titleVariant.H3: return { fontSize: '18px', lineHeight: '120%' }
            case titleVariant.H4: return { fontSize: '16px', lineHeight: '120%' }
            case titleVariant.H5: return { fontSize: '14px', lineHeight: '120%' }
        }
    }}
    @media ${device.tabletM} {
        ${({ variant }) => {
            switch (variant) {
                case titleVariant.H1: return { fontSize: '48px', lineHeight: '110%' }
                case titleVariant.H2: return { fontSize: '32px', lineHeight: '120%' }
                case titleVariant.H3: return { fontSize: '24px', lineHeight: '120%' }
                case titleVariant.H4: return { fontSize: '18px', lineHeight: '120%' }
                case titleVariant.H5: return { fontSize: '16px', lineHeight: '120%' }
            }
        }}
    }
    @media ${device.laptopM} {
        ${({ variant }) => {
            switch (variant) {
                case titleVariant.H1: return { fontSize: '56px', lineHeight: '110%' }
                case titleVariant.H2: return { fontSize: '48px', lineHeight: '120%' }
                case titleVariant.H3: return { fontSize: '32px', lineHeight: '120%' }
                case titleVariant.H4: return { fontSize: '24px', lineHeight: '120%' }
                case titleVariant.H5: return { fontSize: '18px', lineHeight: '120%' }
            }
        }}
    }
`

export default React.memo(Title)
