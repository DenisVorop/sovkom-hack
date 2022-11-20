import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

interface ILinkProps {
    isMain?: boolean
}

const A = styled(Link) <ILinkProps>`
    color: ${({ theme, isMain }) => !isMain ? theme.colors.bg.action2 : theme.colors.bg.action};
`

export default React.memo(A)
