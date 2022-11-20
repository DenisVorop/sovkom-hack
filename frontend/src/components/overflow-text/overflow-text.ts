import React from 'react'
import styled from 'styled-components'

import Text from '../text/text'

const OverflowText = styled(Text).attrs((props) => ({
    ...props,
})) <{ lines: number }>`
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    -ms-line-clamp: ${({ lines }) => lines};
    -webkit-line-clamp: ${({ lines }) => lines};
    line-clamp: ${({ lines }) => lines};
    display: -webkit-box;
    display: box;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    box-orient: vertical;
`

export default React.memo(OverflowText)
