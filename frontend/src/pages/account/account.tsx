import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import Button from '../../components/button/button'
import Container from '../../components/container/container'

import Head from '../../features/account/head'
import TradingAccount from '../../features/account/trading-account'

import { buttonVariant, path } from '../../libs/consts'
import { useUserAccountsQuery } from '../../store/services/txs/accounts/api'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0 12px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Account: React.FC = () => {
  const navigate = useNavigate()

  const { data: accounts } = useUserAccountsQuery(null)

  const handleNavigateToCreateAccount = React.useCallback(() => {
    navigate(path.CREATE_ACCOUNT)
  }, [])

  return <Wrapper>
    <Head
      title="Торговые счета"
      count={accounts?.length || 0}
    >
      <Button
        variant={buttonVariant.BUY}
        w="fit-content"
        onClick={handleNavigateToCreateAccount}
      >
        Создать счет
      </Button>
    </Head>
    <Container>
      <List>
        {accounts?.map(acc => (
          <TradingAccount
            key={acc.id}
            acc={acc}
          />
        ))}
      </List>
    </Container>
  </Wrapper>
}

export default React.memo(Account)
