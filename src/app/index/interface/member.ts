export interface CreateMember {
    member_username: string,
    member_password: string,
    member_name: string,
    member_lastname: string,
    member_tel: string,
    member_address: string,
    member_email: string
}

export interface EditMember{
    member_id: string,
    member_name: string,
    member_lastname: string,
    member_tel: string,
    member_address: string,
    member_email: string
}