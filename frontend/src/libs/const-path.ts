export const BASE_API_URL = 'http://localhost'
// export const BASE_URL_8000 = 'http://localhost:8000'

export const SERVICES = {
    auth_port: ':3100',
    graph_port: ':3200',
    txs_port: ':3300',
}

export const apiEndPoints = {
    // AUTH
    REGISTER: '/api/register',
    APPROVE_EMAIL: '/api/approve_email',
    LOGIN: '/api/login',
    ME: '/api/users/me',
    REFRESH_DATA: '/api/refresh_data',
    LOGOUT: '/api/logout',
    FORGOT_PASSWORD: '/api/forgot_password',
    RESTORE_PASSWORD: '/api/restore_password',
    CHANGE_PASSWORD: '/api/restore_password',

    // ADMIN
    LIST_USERS: '/api/admin/list_users',
    APPROVE_USER: '/api/admin/approve_user',
    BAN_USER: '/api/admin/user_ban',
    LIST_WITHDRAW: '/api/admin/list_withdraw',
    APPROVE_WITHDRAW: '/api/admin/approve_withdraw',

    // TXS
    NEW_TRANSACTION: '/api/transaction/new',
    USER_TRANSACTIONS: '/api/transactions/all',
    ACCOUNT_TRANSACTIONS: '/api/transactions/list',

    // ACCOUNTS
    NEW_ACCOUNT: '/api/account/new',
    USER_ACCOUNTS: '/api/account/list',
    INVOICE: '/api/account/invoice',
    APPROVE_INVOICE: '/api/account/invoice?status=success&hash=2343423432432',
    TRANSFER: '/api/account/transfer',

    // GRAPH
    GRAPH_YAHOO: '/api/cache/graph/yahoo',
    CODES_CENTROBANK: '/api/cache/codes/centrobank',
    COURSES_DAILY: '/api/cache/courses/daily',
    LIVE_COURSES: '/api/cache/courses/apilayer',
}
