import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Cookies } from 'typescript-cookie'

import A from '../../components/link/link'
import Theme from '../../components/theme/theme'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useAdmin } from '../../hooks/use-admin'

import { LogoIcon, LogoutIcon } from '../../assets/images/_images'
import { adminHeaderLinks, AuthorizationStatus, headerLinks, path } from '../../libs/consts'
import { useLogoutMutation } from '../../store/services/auth/api'
import { setAuthorizationStatus } from '../../store/slices/base'

const Wrapper = styled.div`
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.bg.muted};
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    display: flex;
    justify-content: space-between;
`

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    svg {
        path {
            fill: ${({ theme }) => theme.colors.bg.action2};
            :nth-child(2) {
                fill: ${({ theme }) => theme.colors.bg.action};
            }
        }
    }
`

const Links = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`
const Link = styled.div<{ isActive: boolean }>`
    border-bottom: ${({ theme, isActive }) => isActive ? `1px solid ${theme.colors.bg.action2}` : '1px solid transparent'};
    padding: 0 8px;
`

const StyledA = styled(A)`
    font-weight: 400;
    font-size: 18px;
    line-height: 140%;
`

const EndBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
`

const UserCircle = styled.div`
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.bg.action2};
    width: 32px;
    height: 32px;
    :hover {
        cursor: pointer;
    }
`

const Logout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
        cursor: pointer;
    }
`

const Header: React.FC = () => {
    const ROLE = useAppSelector(state => state.user.role)
    const { pathname } = useLocation()
    const isAdmin = useAdmin(ROLE, pathname)
    const [logout] = useLogoutMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogout = React.useCallback(() => {
        logout(null)
        Cookies.remove('user')
        navigate(path.ADMIN_APPLICATIONS)
        dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH))
    }, [])

    return (
        <Wrapper>
            <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
                <LogoWrapper>
                    <A to={isAdmin ? path.ADMIN_APPLICATIONS : path.STOCK}>
                        <LogoIcon />
                    </A>
                </LogoWrapper>
                <Links>
                    {(isAdmin ? adminHeaderLinks : headerLinks).map(link => <Link key={link.path} isActive={pathname === link.path}>
                        <StyledA to={link.path}>{link.link}</StyledA>
                    </Link>)}
                </Links>
            </div>
            <EndBlock>
                <Theme />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <A to={path.ACCOUNT}>
                        <UserCircle />
                    </A>
                    <Logout onClick={handleLogout}>
                        <LogoutIcon />
                    </Logout>
                </div>
            </EndBlock>
        </Wrapper>
    )
}

export default React.memo(Header)
