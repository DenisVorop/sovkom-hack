import React from 'react'
import styled from 'styled-components/macro'

import { device } from '../../libs/utils/utils'

const Mobile = styled.div`
    @media ${device.mobileS} {
        display:none;
    }
    @media ${device.tabletM} {
        display:none;
    }
    @media ${device.laptopM} {
        display:contents;
    }
`

export default React.memo(Mobile)
