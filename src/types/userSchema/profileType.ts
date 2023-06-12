interface EditProfile {
    open: boolean
    onSubmit: () => void
    onCancel: () => void
}

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
}


interface FormEdit {
    onChange: (fields: FieldData[]) => void
    form?: any
    fields: FieldData[]
}
