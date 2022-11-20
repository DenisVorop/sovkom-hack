import React from 'react'
import styled from 'styled-components/macro'

import Button from '../../../components/button/button'
import Container from '../../../components/container/container'
import { IOption } from '../../../components/select/select'

import AccountCard from '../../../features/account/account-card'
import CardsCard from '../../../features/account/cards-card'
import Head from '../../../features/account/head'
import { useInput } from '../../../hooks/use-input'

import { useToggle } from '../../../hooks/use-toggle'
import { buttonVariant } from '../../../libs/consts'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 0 12px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: fit-content;
    button {
        width: fit-content;
    }
`

const options = [
    { value: 'RUB' },
    { value: 'USD' },
]

const Withdraw: React.FC = () => {
    const [isSelectedCard, toggleSelectedCard] = useToggle(false)
    const { bind: amount } = useInput('')
    const [selectedAcc, setSelectedAcc] = React.useState<IOption | IOption[]>({} as IOption)
    const handleSelectAcc = React.useCallback((cur: IOption | IOption[]) => {
        setSelectedAcc(cur)
    }, [])

    return <Wrapper>
        <Head
            title="Вывод средств"
            withBtn={false}
        />
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <AccountCard
                    amount={amount}
                    selected={selectedAcc}
                    handleSelect={handleSelectAcc}
                />
                <Content>
                    <CardsCard
                        onToggle={toggleSelectedCard}
                        isSelected={isSelectedCard}
                    />
                    <Button
                        disabled={!isSelectedCard}
                        variant={buttonVariant.BUY}
                    >
                        Пополнить
                    </Button>
                </Content>
            </div>
        </Container>
    </Wrapper>
}

export default React.memo(Withdraw)
