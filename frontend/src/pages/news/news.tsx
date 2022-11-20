import React from 'react'
import styled from 'styled-components/macro'

import Card from '../../components/card/card'
import Container from '../../components/container/container'

import Search from '../../features/news/search'
import { device } from '../../libs/utils/utils'

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 32px 16px;
    padding: 16px 0;

    @media ${device.mobileS} {
        grid-template-columns: repeat(1, 1fr);
    }
    @media ${device.mobileL} {
        grid-template-columns: repeat(2, 1fr);
    }
    @media ${device.tabletM} {
        grid-template-columns: repeat(3, 1fr);
    }
    @media ${device.laptopS} {
        grid-template-columns: repeat(4, 1fr);
    }
    @media ${device.laptopM} {
        grid-template-columns: repeat(5, 1fr);
    }
`

const News: React.FC = () => {
    return (
        <>
            <Search />
            <Container>
                <Cards>
                    {[...new Array(24).keys()].map((_, index) => (
                        <Card
                            key={index}
                        />
                    ))}
                </Cards>
            </Container>
        </>
    )
}

export default React.memo(News)
