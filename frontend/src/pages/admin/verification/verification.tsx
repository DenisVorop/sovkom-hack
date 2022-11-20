import React from 'react'
import styled from 'styled-components/macro'

import Button from '../../../components/button/button'
import Container from '../../../components/container/container'
import Table from '../../../components/table/table'

import Search from '../../../features/admin/search'
import { useSearch } from '../../../hooks/use-search'

import { buttonVariant } from '../../../libs/consts'

const thead = ['ID пользователя', 'Номер счета', 'ФИО', 'Паспорт', 'Номер телефона', 'Время', 'Действие']

const arr = []
const Verification: React.FC = () => {
    const [filteredArr, bind] = useSearch(arr, 'name')

    return <>
        <Search title="Верификация пользователей" bind={bind} />
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
                        <td>128379824921</td>
                        <td>128379824921</td>
                        <td>10.26 13:25:35</td>
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

export default React.memo(Verification)
