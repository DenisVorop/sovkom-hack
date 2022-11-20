import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useNotification } from './use-notify'
import { adminHeaderLinks, roles, path } from './../libs/consts'

export const useAdmin = (role: string, pathname: string): boolean => {
    const navigate = useNavigate()
    const { notify } = useNotification()
    const [isAdmin, setIsAdmin] = React.useState(false)

    React.useEffect(() => {
        setIsAdmin(role === roles.ADMIN)
    }, [role])

    React.useEffect(() => {
        if (!isAdmin && adminHeaderLinks.find(link => link.path === pathname)) {
            navigate(path.STOCK)
            notify({
                type: 'danger',
                content: () => 'У Вас нет доступа!',
            })
        }
    }, [isAdmin])

    return isAdmin
}
