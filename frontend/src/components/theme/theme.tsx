import React from 'react'
import styled from 'styled-components/macro'

import { MoonIcon, SunIcon } from '../../assets/images/_images'
import { useTheme } from '../../hooks/use-theme'
import { themeStyle } from '../../libs/consts'
import IconWrapper from '../icon-wrapper/icon-wrapper'

const Wrapper = styled.div`
    border-radius: 50px;
    background: ${({ theme }) => theme.colors.bg.default};
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease 0s;
    :hover {
        cursor: pointer;
    }
`

interface IIconProps {
    isActive: boolean
    themeName: string
}
const StyledIconWrapper = styled(IconWrapper) <IIconProps>`
    border-radius: 50px;
    transition: all 0.3s ease 0s;
    ${({ theme, themeName, isActive }) => {
        switch (themeName) {
            case themeStyle.LIGHT: {
                return isActive && { background: theme.colors.bg.action }
            }
            case themeStyle.DARK: {
                return isActive && { background: theme.colors.bg.action2 }
            }
        }
    }}
    :hover {
        background-color: ${({ theme, isActive }) => !isActive && theme.colors.bg.muted};
        transition: all 0.3s ease 0s;
        svg path {
            stroke: ${({ theme, isActive, themeName }) => {
        switch (themeName) {
            case themeStyle.LIGHT: {
                return !isActive && theme.colors.bg.action
            }
            case themeStyle.DARK: {
                return !isActive && theme.colors.bg.action2
            }
        }
    }
    };
        }
    }
    svg path {
        ${({ theme, themeName, isActive }) => {
        switch (themeName) {
            case themeStyle.LIGHT: {
                return isActive && { stroke: '#F9F9F9' }
            }
            case themeStyle.DARK: {
                return isActive && { stroke: theme.colors.fg.default }
            }
        }
    }}
    }
`

const Theme: React.FC = () => {
    const { bool, toggle } = useTheme()
    return (
        <Wrapper onClick={toggle}>
            <StyledIconWrapper isActive={!bool} themeName={themeStyle.LIGHT}>
                <SunIcon />
            </StyledIconWrapper>
            <StyledIconWrapper isActive={bool} themeName={themeStyle.DARK}>
                <MoonIcon />
            </StyledIconWrapper>
        </Wrapper>
    )
}

export default React.memo(Theme)
