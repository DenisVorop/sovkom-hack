import React from 'react'
import styled from 'styled-components/macro'

import { device } from '../../libs/utils/utils'

interface ITabletProps {
    less?: boolean
    more?: boolean
}
const Tablet = styled.div<ITabletProps>`
    @media ${device.mobileS} {
        display: ${({ less }) => less ? 'contents' : 'none'};
    }
    @media ${device.tabletM} {
        display:contents
    }
    @media ${device.laptopM} {
        display: ${({ more }) => more ? 'contents' : 'none'};
    }
`

export default React.memo(Tablet)
