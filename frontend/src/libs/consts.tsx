import { CoinsSwapIcon, CreditCardIcon, UserIcon, WalletIcon } from '../assets/images/sidebar/_images'

export const themeStyle = {
    LIGHT: 'light',
    DARK: 'dark',
}

export const path = {
    AUTH: '/auth',
    STOCK: '/',
    NEWS: '/news',
    NEWS_CREATE: '/news/create',

    // ADMIN
    ADMIN_USERS: '/admin/users',
    ADMIN_APPLICATIONS: '/admin/applications',
    ADMIN_VERIFICATION: '/admin/verification',

    // PROFILE
    ACCOUNT: '/account',
    CREATE_ACCOUNT: '/account/create',
    INVOICE: '/account/invoice',
    WITHDRAW: '/account/withdraw',
    PROFILE: '/account/profile',
}

export const roles = {
    ADMIN: 'admin',
    USER: 'USER',
}

export const AuthorizationStatus = {
    AUTH: 'AUTH',
    NO_AUTH: 'NO_AUTH',
}

export const titleVariant = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
}

export const textVariant = {
    T1: 't1',
    T2: 't2',
    T3: 't3',
}

export const buttonVariant = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TEXT: 'text',
    BUY: 'buy',
    SELL: 'sell',
}

export const headerLinks = [
    { link: 'Торговля', path: path.STOCK },
    { link: 'Новости', path: path.NEWS },
]


export const adminHeaderLinks = [
    { link: 'Заявки', path: path.ADMIN_APPLICATIONS },
    { link: 'Верификация', path: path.ADMIN_VERIFICATION },
    { link: 'Пользователи', path: path.ADMIN_USERS },
]

export const sidebarLinks = [
    { link: 'Счета', path: path.ACCOUNT, icon: <WalletIcon /> },
    { link: 'Пополнение', path: path.INVOICE, icon: <CreditCardIcon /> },
    { link: 'Снятие', path: path.WITHDRAW, icon: <CoinsSwapIcon /> },
    { link: 'Профиль', path: path.PROFILE, icon: <UserIcon /> },
]
