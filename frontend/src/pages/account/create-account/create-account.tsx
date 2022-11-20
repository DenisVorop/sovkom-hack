import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import Button from '../../../components/button/button'
import Container from '../../../components/container/container'
import Tabs from '../../../components/tabs/tabs'
import Text from '../../../components/text/text'

import Head from '../../../features/account/head'
import { useErrorProcessing } from '../../../hooks/use-error-processing'
import { buttonVariant, path, textVariant } from '../../../libs/consts'
import { useNewAccountMutation } from '../../../store/services/txs/accounts/api'


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
`

const TabsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Card = styled.div`
    background: ${({ theme }) => theme.colors.bg.muted};
    border-radius: 4px;
    width: fit-content;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const typeOptions = ['Cent', 'Classic']
const currenciesOptions = ['RUB', 'USD']
const leverageOptions = ['10', '100', '200', '500', '1000']

const CreateAccount: React.FC = () => {
    const [selectedTypeOptionIdx, setSelectedTypeOptionIdx] = React.useState<number>(0)
    const [selectedCurrOptionIdx, setSelectedCurrOptionIdx] = React.useState<number>(0)
    const [selectedLeverageOptionIdx, setSelectedLeverageOptionIdx] = React.useState<number>(0)
    const navigate = useNavigate()
    const [newAccount, { isSuccess, isError }] = useNewAccountMutation()

    const handleNavigateToAccounts = React.useCallback(() => {
        navigate(path.ACCOUNT)
    }, [])

    const { handleSetError, handleSetSuccess } = useErrorProcessing('Счет успешно создан!', 'Непредвиденная ошибка :0', handleNavigateToAccounts, null)

    React.useEffect(() => {
        if (isSuccess)
            handleSetSuccess(isSuccess)
        if (isError)
            handleSetError(isError)
    }, [isSuccess, isError])

    const toggleTab = React.useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
        setSelectedTypeOptionIdx(idx)
    }, [])
    const toggleCurrTab = React.useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
        setSelectedCurrOptionIdx(idx)
    }, [])
    const toggleLeverageTab = React.useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
        setSelectedLeverageOptionIdx(idx)
    }, [])

    const createNewAccount = React.useCallback(() => {
        newAccount({
            ticket: currenciesOptions[selectedCurrOptionIdx],
            type: typeOptions[selectedTypeOptionIdx],
            leverage: +leverageOptions[selectedLeverageOptionIdx],
        })
    }, [selectedTypeOptionIdx, selectedCurrOptionIdx, selectedLeverageOptionIdx])

    return (
        <Wrapper>
            <Head
                title="Создание торгового счета"
                withBtn={false}
            />
            <Container>
                <Content>
                    <Card>
                        <TabsWrapper>
                            <Tabs
                                arr={typeOptions}
                                index={selectedTypeOptionIdx}
                                toggleTab={toggleTab}
                                description="Тип счета"
                                w="fit-content"
                            />
                            <Text variant={textVariant.T3} secondary>0,01 (0,0001) мин. лот | Фиксированный спред</Text>
                        </TabsWrapper>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <Tabs
                                arr={currenciesOptions}
                                index={selectedCurrOptionIdx}
                                toggleTab={toggleCurrTab}
                                description="Валюта"
                                w="fit-content"
                            />
                            <Tabs
                                arr={leverageOptions}
                                index={selectedLeverageOptionIdx}
                                toggleTab={toggleLeverageTab}
                                description="Кредитное плечо"
                                w="fit-content"
                            />
                        </div>
                    </Card>
                    <Button
                        variant={buttonVariant.BUY}
                        w="fit-content"
                        onClick={createNewAccount}
                    >
                        Создать
                    </Button>
                </Content>
            </Container>
        </Wrapper>
    )
}

export default React.memo(CreateAccount)
