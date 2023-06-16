interface skilltypeDetail {
    skty_name: string
}

interface SkillType {
    skillType: skilltypeDetail[] | undefined
    refresh: boolean
}