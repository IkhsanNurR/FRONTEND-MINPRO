interface Users {
    user_entity_id?: string
    user_name?: string
    user_password?: string
    user_first_name?: string
    user_last_name?: string
    user_birth_date?: Date
    user_photo?: string
    role_name?: string
    pmail_address?: Email[] | undefined
    phone?: Phones[] | undefined
    address?: Address[] | undefined
}

interface Email {
    pmail_id: number
    pmail_address: string
}

interface Phones {
    uspo_ponty_code: string
    uspo_number: string
}

interface Address {
    etad_addr_id: number
    addr_line1: string
    addr_line2?: string
    addr_postal_code: string
    city_id?: number
    city: string
    address_type_id?: number
    address_type: string
}

interface PontyCode {
    ponty_code: string
}

interface pontyCode {
    pontycode: PontyCode[]
    refresh: boolean
}

interface userProfile {
    users: Users
    refresh: boolean
}

interface ModalEdit {
    open: boolean
    onSubmit: () => void
    onCancel: () => void
    id?: number
    phonenumber?: any
}

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
}

interface ModalAdd {
    id: any
    open: boolean
    onSubmit: () => void
    onCancel: () => void
}

interface FormEdit {
    onFinish?: (value: any) => void
    onChange: (fields: FieldData[]) => void
    form?: any
    fields: FieldData[]
}
