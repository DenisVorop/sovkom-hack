import React from 'react'
import styled from 'styled-components/macro'

import Button from '../../../components/button/button'
import Container from '../../../components/container/container'
import InputWithLabel from '../../../components/input-with-label/input-with-label'
import Title from '../../../components/title/title'

import Head from '../../../features/account/head'

import { buttonVariant, titleVariant } from '../../../libs/consts'
import { useMeQuery } from '../../../store/services/auth/api'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 0 12px;
`

const Card = styled.div`
    background: ${({ theme }) => theme.colors.bg.muted};
    border-radius: 4px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const Row = styled.div`
    display: flex;
    gap: 16px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const Block = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const Profile: React.FC = () => {
    const { data: me } = useMeQuery(null)

    const [changeFields, setChangeFields] = React.useState({
        firstName: '', middleName: '', lastName: '',
        id: '', passport: '', date: '', issuedBy: '',
        address: '', email: '', password: '',
    })

    React.useEffect(() => {
        if (!me) {
            return
        }
        setChangeFields({
            ...changeFields,
            id: me.id,
            email: me.username,
        })
    }, [me])

    const handleChangeField = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeFields({ ...changeFields, [e.target.name]: e.target.value })
    }, [changeFields])

    return (
        <Wrapper>
            <Head
                title="Данные профиля"
            >
                <Button
                    variant={buttonVariant.BUY}
                    w="fit-content"
                    disabled
                >
                    Изменить
                </Button>
            </Head>
            <Container>
                <Content>
                    <Card>
                        <Row>
                            <InputWithLabel
                                label="Имя"
                                onChange={handleChangeField}
                                value={changeFields['firstName']}
                                name="firstName"
                                placeholder="Денис"
                                disabled
                            />
                            <InputWithLabel
                                label="Фамилия"
                                onChange={handleChangeField}
                                value={changeFields['middleName']}
                                name="middleName"
                                placeholder="Воропаев"
                                disabled
                            />
                            <InputWithLabel
                                label="Отчество"
                                onChange={handleChangeField}
                                value={changeFields['lastName']}
                                name="lastName"
                                placeholder="Юрьевич"
                                disabled
                            />
                            <InputWithLabel
                                label="ID пользователя"
                                onChange={handleChangeField}
                                value={changeFields['id']}
                                name="Id"
                                placeholder="57085453"
                                disabled
                            />
                        </Row>
                    </Card>
                    <Block>
                        <Title variant={titleVariant.H5}>Паспортные данные</Title>
                        <Card>
                            <Row>
                                <InputWithLabel
                                    label="Номер паспорта"
                                    onChange={handleChangeField}
                                    name="passport"
                                    value={changeFields['passport']}
                                    placeholder="3432 456678"
                                    disabled
                                />
                                <InputWithLabel
                                    label="Дата выдачи"
                                    onChange={handleChangeField}
                                    name="date"
                                    value={changeFields['date']}
                                    placeholder="06.12.2020"
                                    disabled
                                />
                                <InputWithLabel
                                    label="Кем выдан"
                                    onChange={handleChangeField}
                                    name="issuedBy"
                                    value={changeFields['issuedBy']}
                                    placeholder="ГУ МВД РОССИИ ПО Г. МОСКВА"
                                    disabled
                                />
                            </Row>
                            <InputWithLabel
                                label="Адрес прописки"
                                onChange={handleChangeField}
                                name="address"
                                value={changeFields['address']}
                                placeholder="Московская область, г. Видное, ул. Дружбы, д. 99, кв. 999"
                                disabled
                            />
                        </Card>
                    </Block>
                    <Block>
                        <Title variant={titleVariant.H5}>Данные для входа</Title>
                        <Card>
                            <Row>
                                <InputWithLabel
                                    label="Электронная почта"
                                    onChange={handleChangeField}
                                    name="email"
                                    value={changeFields['email']}
                                    placeholder="test@test.ru"
                                    disabled
                                />
                                <InputWithLabel
                                    label="Пароль"
                                    onChange={handleChangeField}
                                    name="password"
                                    value={changeFields['password']}
                                    placeholder="•••••••••••"
                                    type="password"
                                    disabled
                                />
                            </Row>
                        </Card>
                    </Block>
                </Content>
            </Container>
        </Wrapper>
    )
}

export default React.memo(Profile)
