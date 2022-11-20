import React from 'react'
import styled from 'styled-components/macro'

import Sidebar from '../sidebar/sidebar'

const Layout = styled.div`
    display: flex;
    flex: 1 1 auto;
`

interface IAccounLayoutProps {
    children: React.ReactNode
}

const AccounLayout: React.FC<IAccounLayoutProps> = ({
    children,
}) => {
    return (
        <Layout>
            <Sidebar />
            {children}
        </Layout>
    )
}

export default React.memo(AccounLayout)
