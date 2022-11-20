import { path } from '../libs/consts'

import AccountLayout from '../features/layouts/account-layout'

import Applications from './admin/applications/applications'
import Users from './admin/users/users'
import Verification from './admin/verification/verification'

import Auth from './auth/auth'
import NewsCreate from './news-create/news-create'
import News from './news/news'
import Stock from './stock/stock'

import Account from './account/account'
import Withdraw from './account/withdraw/withdraw'
import Invoice from './account/invoice/invoice'
import CreateAccount from './account/create-account/create-account'
import Profile from './account/profile/profile'

interface IPages {
    element: React.ReactNode
    path: string
}

export const pages: IPages[] = [
    { element: <Auth />, path: path.AUTH },
    { element: <Stock />, path: path.STOCK },
    { element: <News />, path: path.NEWS },
    { element: <NewsCreate />, path: path.NEWS_CREATE },

    { element: <Applications />, path: path.ADMIN_APPLICATIONS },
    { element: <Users />, path: path.ADMIN_USERS },
    { element: <Verification />, path: path.ADMIN_VERIFICATION },

    { element: <AccountLayout><Account /></AccountLayout>, path: path.ACCOUNT },
    { element: <AccountLayout><Withdraw /></AccountLayout>, path: path.WITHDRAW },
    { element: <AccountLayout><Invoice /></AccountLayout>, path: path.INVOICE },
    { element: <AccountLayout><CreateAccount /></AccountLayout>, path: path.CREATE_ACCOUNT },
    { element: <AccountLayout><Profile /></AccountLayout>, path: path.PROFILE },
]
