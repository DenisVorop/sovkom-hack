import React from 'react'
import styled from 'styled-components/macro'

import Button from '../../../components/button/button'
import Container from '../../../components/container/container'
import Table from '../../../components/table/table'

import Search from '../../../features/admin/search'

import { useSearch } from '../../../hooks/use-search'
import { buttonVariant } from '../../../libs/consts'
import { useListWithdrawQuery } from '../../../store/services/admin/api'

const thead = ['ID пользователя', 'Номер счета', 'ФИО', 'Время', 'Валюта', 'Сумма', 'Действие']

const arr = []

const Applications: React.FC = () => {
    const { data: listWithdraw } = useListWithdrawQuery(null)
    const [filteredArr, bind] = useSearch(arr, 'name')

    return <>
        <Search title="Заявки на вывод средств" bind={bind} />
        <Container>
            <Table>
                <thead>
                    <tr>{thead.map(th => <th key={th}>{th}</th>)}</tr>
                </thead>
                <tbody>
                    <tr>
                        <td>79824921</td>
                        <td>128379824921</td>
                        <td>Козлов Иван Сергеевич</td>
                        <td>10.26 13:25:35</td>
                        <td>RUB</td>
                        <td>61.400</td>
                        <td>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Button small variant={buttonVariant.SELL}>Отклонить</Button>
                                <Button small variant={buttonVariant.BUY}>Одобрить</Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    </>
}

export default React.memo(Applications)
