import React from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
    max-width: 1416px;
    padding: 0 12px;
    box-sizing: border-box;
    margin: 0 auto;
    height: 100%;
    flex: 1 1 auto;
    width: 100%;
`

export default React.memo(Container)
