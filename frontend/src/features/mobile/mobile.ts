import React from 'react'
import styled from 'styled-components/macro'

import { device } from '../../libs/utils/utils'


const Mobile = styled.div`
    @media ${device.mobileS} {
        display:contents;
    }
    @media ${device.tabletM} {
        display:none;
    }
    @media ${device.laptopM} {
        display:none;
    }
`

export default React.memo(Mobile)
