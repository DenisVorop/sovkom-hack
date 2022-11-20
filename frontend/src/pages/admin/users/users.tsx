import React from 'react'
import styled from 'styled-components/macro'

import Container from '../../../components/container/container'
import Button from '../../../components/button/button'
import Table from '../../../components/table/table'

import Search from '../../../features/admin/search'

import { useSearch } from '../../../hooks/use-search'
import { buttonVariant } from '../../../libs/consts'
import { useBanUserMutation, useListUsersQuery } from '../../../store/services/admin/api'
import { TUser } from '../../../types/types'

const thead = ['ID пользователя', 'Логин', 'Время регистрации', 'Почта', 'Статус', 'Верификация', 'Действие']

const Users: React.FC = () => {
    const { data: usersList, isSuccess, isError } = useListUsersQuery(null)
    const [banUser] = useBanUserMutation()
    const [filteredArr, bind] = useSearch<TUser>(usersList ? usersList : [], 'name')

    const handleBanUser = React.useCallback((user: TUser) => {
        const isConfirmed = window.confirm('Вы уверены, что хотите заблокировать пользователя?')
        if (isConfirmed) {
            banUser({
                username: user.username,
                unban: user.ban ? true : false,
            })
        }
    }, [])

    return <>
        <Search title="Список пользователей" bind={bind} />
        <Container>
            <Table>
                <thead>
                    <tr>{thead.map(th => <th key={th}>{th}</th>)}</tr>
                </thead>
                <tbody>
                    {filteredArr?.map(user => {
                        const date = new Date(user.date_created).toLocaleString()
                        return <tr>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{date}</td>
                            <td>{user.email_virified ? 'Подтверждена' : 'Не подтверждена'}</td>
                            <td>{user.ban ? 'Заблокирован' : 'Активен'}</td>
                            <td>{user.approved_by_admin ? 'Подтвержден' : 'Не подтвержден'}</td>
                            <td>
                                <Button
                                    small
                                    variant={user.ban ? buttonVariant.BUY : buttonVariant.SELL}
                                    onClick={() => handleBanUser(user)}
                                >
                                    {user.ban ? 'Разблокировать' : 'Заблокировать'}
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </Container>
    </>
}

export default React.memo(Users)
