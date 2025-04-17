interface userDetailProps {
    id : number
    uid : string
    name: string | null,
    email: string,
    phone_number: string | null,
    status :  string
    role: string,
    date_joined: string,
    is_verified: boolean,
    kyc_status: string,
    id_type: null | string,
    id_number: null | string,
    current_balance: string,
    total_deposits: string,
    total_withdrawals: string
}