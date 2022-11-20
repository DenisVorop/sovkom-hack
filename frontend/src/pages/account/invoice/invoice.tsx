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

const currOptions = [{ value: 'RUB' }, { value: 'USD' }]

const Invoice: React.FC = () => {
    const [isSelectedCard, toggleSelectedCard] = useToggle(false)
    const { bind: amount } = useInput('')
    const [selectedAcc, setSelectedAcc] = React.useState<IOption | IOption[]>({} as IOption)
    const [selectedCurr, setSelectedCurr] = React.useState<IOption | IOption[]>(currOptions[0] as IOption)
    const handleSelectAcc = React.useCallback((cur: IOption | IOption[]) => {
        setSelectedAcc(cur)
    }, [])
    const handleSelectCurrency = React.useCallback((cur: IOption | IOption[]) => {
        setSelectedCurr(cur)
    }, [])
    return <Wrapper>
        <Head
            title="Пополнение счета"
            withBtn={false}
        />
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <AccountCard
                    amount={amount}
                    selected={selectedAcc}
                    handleSelect={handleSelectAcc}
                    optionsCurr={currOptions}
                    selectedCur={selectedCurr}
                    handleSelectCurrency={handleSelectCurrency}
                    withCurr
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

export default React.memo(Invoice)
