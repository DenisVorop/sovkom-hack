import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import Button from '../../components/button/button'
import Container from '../../components/container/container'
import InputWithLabel from '../../components/input-with-label/input-with-label'

import { useInput } from '../../hooks/use-input'
import { useMatchMedia } from '../../hooks/use-match-media'
import { buttonVariant, path } from '../../libs/consts'
import { device } from '../../libs/utils/utils'

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.bg.muted};
    padding: 12px 0;
`

const Content = styled.div`
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    width: 100%;
    gap: 12px;

    @media ${device.tabletM} {
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
`

const BlockWrapper = styled.div`
    width: 100%;
    @media ${device.tabletM} {
        width: fit-content;
    }
`

interface ISearchNewsProps { }

const SearchNews: React.FC<ISearchNewsProps> = () => {
    const navigate = useNavigate()
    const { bind: bindSearch } = useInput('')
    const { mobile } = useMatchMedia()

    const handleNavigate = React.useCallback(() => {
        navigate(path.NEWS_CREATE)
    }, [])

    return (
        <Wrapper>
            <Container>
                <Content>
                    <BlockWrapper>
                        <InputWithLabel
                            {...bindSearch}
                            placeholder="Поиск"
                            w={mobile ? '100%' : '420px'}
                        />
                    </BlockWrapper>
                    <BlockWrapper>
                        <Button
                            variant={buttonVariant.BUY}
                            onClick={handleNavigate}
                        >
                            Создать новость
                        </Button>
                    </BlockWrapper>
                </Content>
            </Container>
        </Wrapper>
    )
}

export default React.memo(SearchNews)
