interface addressTypeDetail {
    adty_id: number
    adty_name: string
}

interface addressType {
    addressType: addressTypeDetail[] | undefined
    refresh: boolean
}