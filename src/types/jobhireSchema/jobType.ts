interface jobDetail {
    jopo_entity_id: number
    jopo_number?: string
    jopo_title?: string
    jopo_start_date?: string
    jopo_end_date?: string
    jopo_min_salary?: string
    jopo_max_salary?: string
    jopo_min_experience?: number
    jopo_max_experience?: number
    jopo_primary_skill?: string
    jopo_secondary_skill?:string
    jopo_publish_date?: string
    jopho_filename: string
}

interface Job{
    job_post: jobDetail[]
}