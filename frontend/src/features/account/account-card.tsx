import React from 'react'
import styled from 'styled-components/macro'

import InputWithLabel from '../../components/input-with-label/input-with-label'
import Select, { IOption } from '../../components/select/select'
import Text from '../../components/text/text'
import { textVariant } from '../../libs/consts'

import { useUserAccountsQuery } from '../../store/services/txs/accounts/api'

const Wrapper = styled.div`
    padding: 16px;
    background: ${({ theme }) => theme.colors.bg.muted};
    border-radius: 4px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 426px;
`

const InputsWrapper = styled.div`
    display: flex;
    gap: 12px;
`

const ErrorBlock = styled.div`
    color: #E80007;
`

interface IAccountCardProps {
    withCurr?: boolean
    amount: {
        value: string
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    },
    selected: IOption | IOption[]
    selectedCur?: IOption | IOption[]
    handleSelectCurrency?: (val: IOption | IOption[]) => void
    handleSelect: (val: IOption | IOption[]) => void
    options?: IOption[]
    optionsCurr?: IOption[]
}

const AccountCard: React.FC<IAccountCardProps> = ({
    withCurr = false,
    amount,
    selected,
    handleSelectCurrency,
    options = [],
    selectedCur,
    handleSelect,
    optionsCurr = [],
}) => {
    const [balance, setBalance] = React.useState(0)
    const { data } = useUserAccountsQuery(null)

    const accountsOptions = React.useMemo(() => {
        if (!data) {
            return
        }
        return data.reduce((acc, account) => {
            acc.push({ value: account.hash })
            return acc
        }, [] as IOption[])
    }, [data])

    React.useEffect(() => {
        const a = selected as IOption
        setBalance(+a.value || 0)
    }, [selected])

    return (<>
        <Wrapper>
            <Select
                label="Счет"
                list={accountsOptions!}
                selectHandler={handleSelect}
                selected={selected}
            />
            <InputsWrapper>
                <InputWithLabel
                    {...amount}
                    label="Сумма"
                    placeholder="Сумма"
                    type="number"
                />
                {withCurr && <Select
                    label="Валюта"
                    list={optionsCurr}
                    selectHandler={handleSelectCurrency!}
                    selected={selectedCur!}
                />}
            </InputsWrapper>
        </Wrapper>
        <ErrorBlock>
            {(!accountsOptions || (accountsOptions.length) === 0) && <Text variant={textVariant.T2}>Вам необходимо создать кошелек</Text>}
            {balance < +amount.value && <Text variant={textVariant.T2}>На счете недостаточно средств для выполнения операции</Text>}
        </ErrorBlock>
    </>
    )
}

export default React.memo(AccountCard)
