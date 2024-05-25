export interface CreateOrganizer {
    organ_username: string,
    organ_password: string,
    organ_name: string,
    organ_lastname: string,
    organ_tel: string,
    organ_address: string,
    organ_email: string
}

export interface EditOrganizer {
    organ_id: string,
    organ_name: string,
    organ_lastname: string,
    organ_tel: string,
    organ_address: string,
    organ_email: string
}