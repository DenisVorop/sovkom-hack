import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Cookies } from 'typescript-cookie'

import { useNotification } from '../hooks/use-notify'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useMe } from '../hooks/use-me'

import { AuthorizationStatus, path } from '../libs/consts'

import { setAuthorizationStatus } from '../store/slices/base'
import { setRole, setUser } from '../store/slices/user'

import Header from '../features/header/header'

import Redirect from './redirect'



interface IPrivateRouteProps {
    children: React.ReactNode
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { notify } = useNotification()
    const [isLoading, setIsLoading] = React.useState(true)
    const [me, setDelay, refetch] = useMe()

    const authorizationStatus = useAppSelector((state) => state.base.authorizationStatus)

    React.useEffect(() => {
        if (authorizationStatus !== AuthorizationStatus.AUTH && Cookies.get('user')) {
            dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH))
            dispatch(setUser(JSON.parse(String(Cookies.get('user')))))
        }

        if (!Cookies.get('user')) {
            dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH))
            setDelay(0)
        }

        if (location.pathname === '/auth') {
            navigate(path.ACCOUNT)
            // notify({
            //     type: 'success',
            //     content: () => 'Вы авторизованы',
            // })
        }

        if (authorizationStatus === AuthorizationStatus.AUTH) {
            refetch()
            setDelay(1000 * 60 * 5)
            dispatch(setRole(me))
        }

        setIsLoading(false)
    }, [authorizationStatus, me])

    return (
        <>
            {!isLoading
                ? authorizationStatus === AuthorizationStatus.AUTH
                    ? <>
                        <Header />
                        {children}
                    </>
                    : <Redirect to={path.AUTH} />
                : <h1>Loading...</h1>
            }
        </>
    )
}

export default React.memo(PrivateRoute)
