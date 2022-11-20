import React from 'react'
import styled from 'styled-components/macro'

import { useInput } from '../../hooks/use-input'
import { useErrorProcessing } from '../../hooks/use-error-processing'
import { buttonVariant, titleVariant } from '../../libs/consts'

import Button from '../../components/button/button'
import IconWrapper from '../../components/icon-wrapper/icon-wrapper'
import InputWithLabel from '../../components/input-with-label/input-with-label'
import Title from '../../components/title/title'

import { useNewTransactionMutation } from '../../store/services/txs/api'
import { useLiveCoursesQuery } from '../../store/services/courses-graph/api'
import { CloseIcon } from '../../assets/images/_images'

const Wrapper = styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.bg.default};
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    border-bottom: none;
`

const TopBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Row = styled.div`
    display: flex;
    gap: 12px;
`

interface ICreateDealProps {
    symbolFrom: string
    symbolTo: string
}

const CreateDeal: React.FC<ICreateDealProps> = ({ symbolFrom, symbolTo }) => {
    const { bind: bindCount, reset: countReset } = useInput('')
    const { value: volume, bind: bindVolume, reset: volumeReset } = useInput('')
    const { bind: bindStopLoss, reset: stopLossReset } = useInput('')
    const { bind: bindTakeProfit, reset: takeProfitReset } = useInput('')

    const { data } = useLiveCoursesQuery(null)

    const [createDeal, { isSuccess, isError }] = useNewTransactionMutation()

    const handleReset = React.useCallback(() => {
        countReset()
        volumeReset()
        stopLossReset()
        takeProfitReset()
    }, [])

    const { handleSetError, handleSetSuccess } = useErrorProcessing('Сделка открыта успешно!', 'Непредвиденная ошибка :0', handleReset, null)

    React.useEffect(() => {
        if (isSuccess)
            handleSetSuccess(isSuccess)
        if (isError)
            handleSetError(isError)
    }, [isSuccess, isError])

    const handleCreateDeal = React.useCallback((type: string) => {
        createDeal({
            id_account: 3,
            ticket_from: symbolFrom,
            ticket_to: symbolTo,
            action: type,
            instrument: 'market',
            amount: +volume,
            client_open_value: data?.symbolFrom,
            client_close_value: null,
            status: 'new',
        })
    }, [symbolFrom, symbolTo, volume, data])

    return (
        <Wrapper>
            <TopBlock>
                <Title variant={titleVariant.H5}>Рыночное исполнение</Title>
                <IconWrapper>
                    <CloseIcon />
                </IconWrapper>
            </TopBlock>
            <InputsWrapper>
                <InputWithLabel
                    label="Volume"
                    counter
                    {...bindVolume}
                    type="number"
                />
                <Row>
                    <InputWithLabel
                        label="Stop Loss"
                        counter
                        {...bindStopLoss}
                        type="number"
                    />
                    <InputWithLabel
                        label="Take Profit"
                        counter
                        {...bindTakeProfit}
                        type="number"
                    />
                </Row>
                <InputWithLabel
                    label="Comment"
                    {...bindCount}
                />
            </InputsWrapper>
            <Row>
                <Button
                    variant={buttonVariant.SELL}
                    onClick={() => handleCreateDeal('sell')}
                >
                    Sell
                </Button>
                <Button
                    variant={buttonVariant.BUY}
                    onClick={() => handleCreateDeal('buy')}
                >
                    Buy
                </Button>
            </Row>
        </Wrapper>
    )
}

export default React.memo(CreateDeal)
