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
}

interface Email {
    pmail_id: string
    pmail_address: string
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
