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
    education?: Education[] | undefined
    experiences?: Experiences[] | undefined
    skill?: Skill[] | undefined
    resume?: Resume[] | undefined
}

interface Resume {
    usme_id: number
    usme_filelink: string
}

interface Skill {
    uski_id: number
    uski_skty_name: string
}

interface Education {
    usdu_id: number
    usdu_school: string
    usdu_degree: string
    usdu_field_study: string
    usdu_graduate_year: string
    usdu_start_date: Date
    usdu_end_date: Date
    usdu_grade: string
    usdu_activities: string
    usdu_description: string
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

interface Experiences {
    usex_id: number
    usex_title: string
    usex_profile_headline: string
    usex_company_name: string
    usex_start_date: Date
    usex_end_date: Date
    usex_industry: string
    usex_description: string
    usex_experience_type: string
    usex_employment_type: string
    city_name: string
    usex_city_id?: number
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
    refresh?: boolean
    msg?: string
    status?: number
    messageChangePassword?: string
    statusChangePassword?: number
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
    value?: any | any[];
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
