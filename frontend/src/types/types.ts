export type TUser = {
    approved_by_admin: boolean
    ban: boolean
    date_created: string
    email_virified: boolean
    firstname: string
    id: string
    is_admin: boolean
    lastname: string
    username: string
}

export type TMe = {
    approved_by_admin: boolean
    ban: boolean
    email_virified: boolean
    id: string
    is_admin: boolean
    userdata: boolean
    username: string
}

export type TAccount = {
    id: number
    hash: string
    date_created: string
    ticket: string
    type: string
    leverage: number
    balance: number
    transactions: number
}

export type TTransaction = {
    id: number
    direction: string
    action: string
    instrument: string
    amount: number
    leverage: number
    client_open_value: number
    backand_open_value: number
    client_close_value: number
    backand_close_value: number
    status: string
    timestamp_open: number
    timestamp_close: number
}
