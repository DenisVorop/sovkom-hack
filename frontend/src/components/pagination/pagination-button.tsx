import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import Button from '../button/button'

const StyledPaginationButton = styled(Button).attrs({
    variant: 'primary',
})`
    width: 44px;
    height: 44px;
    padding: 5px;
    ${(props) =>
        !props.active
            ? {
                background: 'transparent',
                border: '2px solid rgba(207, 205, 211, 0.6)',
                color: '#B6B3BD',
            }
            : {}}
`

interface IPaginationButtonProps {
    children: React.ReactNode
    url?: string
    onClick: () => void
    active: boolean
}

const PaginationButton: React.FC<IPaginationButtonProps> = (props) => {
    const { children, url = '' } = props
    const button = <StyledPaginationButton {...props} />
    return (
        <Link to={`${url}?page=${children}`}>
            {button}
        </Link>
    )
}

export default React.memo(PaginationButton)
