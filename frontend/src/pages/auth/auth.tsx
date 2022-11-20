import React from 'react'
import styled from 'styled-components/macro'

import Button from '../../components/button/button'
import InputWithLabel from '../../components/input-with-label/input-with-label'
import Title from '../../components/title/title'
import A from '../../components/link/link'
import Container from '../../components/container/container'
import Tabs from '../../components/tabs/tabs'

import { useInput } from '../../hooks/use-input'
import { useToggle } from '../../hooks/use-toggle'
import { useNotification } from '../../hooks/use-notify'
import { useAppDispatch } from '../../hooks/redux'
import { useErrorProcessing } from '../../hooks/use-error-processing'

import { AuthorizationStatus, buttonVariant, titleVariant } from '../../libs/consts'

import { useLoginMutation, useRegisterMutation } from '../../store/services/auth/api'
import { setUser } from '../../store/slices/user'
import { setAuthorizationStatus } from '../../store/slices/base'


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 12px;
    border-radius: 4px;
    max-width: 660px;
`

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const Typography = styled.p`
    display: flex;
    align-items: center;
    gap: 4px;
`

const CenterBlock = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
`

const Block = styled.div<{ isAuth: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin: ${({ isAuth }) => isAuth ? '120px auto 0' : '60px auto 0'};
    width: fit-content;
`

const Content = styled.div`
    padding: 24px;
    background-color: ${({ theme }) => theme.colors.bg.muted};
`

const Auth = () => {
    const [isAuth, isAuthToggle] = useToggle(true)

    return <Container>
        <Block isAuth={isAuth}>
            <Title variant={titleVariant.H4}>{isAuth ? 'Вход' : 'Регистрация'}</Title>
            <Content>
                {isAuth
                    ? <AuthForm />
                    : <RegForm isAuthToggle={isAuthToggle} />
                }
                <CenterBlock>
                    <Typography>{isAuth ? 'Еще не' : 'Уже'} зарегистрированы?
                        <Button onClick={isAuthToggle} variant={buttonVariant.TEXT}>
                            {isAuth ? 'Зарегистрироваться' : 'Войти'}</Button>
                    </Typography>
                </CenterBlock>
                <Typography>
                    <span>
                        Продолжая я соглашаюсь на обработку персональных <br />
                        данных на <A isMain to="/yoyoy">следующих условиях</A>
                    </span>
                </Typography>
            </Content>
        </Block>
    </Container>
}

const AuthForm: React.FC = React.memo(() => {
    const [typePassword, setTypePassword] = React.useState(true)
    const { value: emailValue, bind: emailBind } = useInput('')
    const { value: passwordValue, bind: passwordBind } = useInput('')
    const { notify } = useNotification()
    const dispatch = useAppDispatch()

    const [login, { data, isSuccess, isError }] = useLoginMutation()

    const handleSuccessAuth = React.useCallback(() => {
        dispatch(setUser(data))
        dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH))
    }, [data])

    const { handleSetError, handleSetSuccess } = useErrorProcessing('Вы успешно авторизовались!', 'Непредвиденная ошибка :0', handleSuccessAuth, null)

    React.useEffect(() => {
        if (isSuccess)
            handleSetSuccess(isSuccess)
        if (isError)
            handleSetError(isError)
    }, [isSuccess, isError])

    const auth = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', emailValue.toLowerCase())
        formData.append('password', passwordValue)
        login(formData)
    }, [emailValue, passwordValue])

    return <Form onSubmit={auth}>
        <InputsWrapper>
            <InputWithLabel
                {...emailBind}
                placeholder="example@mail.ru"
                label="Электронная почта"
            />
            <InputWithLabel
                {...passwordBind}
                placeholder=""
                label="Пароль"
                type={typePassword ? 'password' : 'text'}
            />
        </InputsWrapper>
        <ButtonWrapper>
            <Button variant={buttonVariant.BUY}>Войти</Button>
        </ButtonWrapper>
    </Form>
})

const RegForm: React.FC<{ isAuthToggle: () => void }> = React.memo(({ isAuthToggle }) => {
    const [typePassword, setTypePassword] = React.useState(true)
    const { value: nameValue, bind: nameBind } = useInput('')
    const { value: emailValue, bind: emailBind } = useInput('')
    const { value: phoneValue, bind: phoneBind } = useInput('')
    const { value: passwordValue, bind: passwordBind } = useInput('')
    const [isAdmin, toggleIsAdmin] = useToggle(false)

    const [register, { isSuccess, isError }] = useRegisterMutation()
    const { handleSetError, handleSetSuccess } = useErrorProcessing('Регистрация прошла успешно', 'Непредвиденная ошибка :0', isAuthToggle, null)

    const reg = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        register({
            username: emailValue.toLowerCase(),
            password: passwordValue,
            is_admin: isAdmin,
        })
    }, [passwordValue, emailValue, isAdmin])

    React.useEffect(() => {
        if (isError)
            handleSetError(isError)
        if (isSuccess)
            handleSetSuccess(isSuccess)
    }, [isError, isSuccess])

    const [leverageIdx, setLeverageIdx] = React.useState<number>(0)
    const handleChangeLeverageIdx = React.useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
        e.preventDefault()
        setLeverageIdx(idx)
    }, [])

    const [roleIdx, setRoleIdx] = React.useState<number>(0)
    const handleChangeRole = React.useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
        e.preventDefault()
        setRoleIdx(idx)
        toggleIsAdmin()
    }, [])

    return <Form onSubmit={reg}>
        <InputsWrapper>
            <InputWithLabel
                {...nameBind}
                placeholder="Петров Петр Петрович"
                label="ФИО"
            />
            <InputWithLabel
                {...emailBind}
                placeholder="example@mail.ru"
                label="Электронная почта"
            />
            <InputWithLabel
                {...phoneBind}
                placeholder="+7 (800) 555-35-35"
                label="Номер телефона"
            />
            <InputWithLabel
                {...passwordBind}
                placeholder=""
                label="Пароль"
                type={typePassword ? 'password' : 'text'}
            />
        </InputsWrapper>
        <Tabs
            arr={roles}
            index={roleIdx}
            toggleTab={handleChangeRole}
            description="Роль:"
        />
        <Tabs
            arr={tabs}
            index={leverageIdx}
            toggleTab={handleChangeLeverageIdx}
            description="При регистрации автоматически создается рублевый счет на вышем аккаунте. Выберите кредитное плечо:"
        />
        <ButtonWrapper>
            <Button variant={buttonVariant.BUY}>Зарегистрироваться</Button>
        </ButtonWrapper>
    </Form>
})

const tabs = ['10', '100', '200', '500', '1000']

const roles = ['user', 'admin']

export default React.memo(Auth)
