export interface CreateAdmin {
    admin_username: string,
    admin_password: string,
    admin_name: string,
    admin_lastname: string,
    admin_tel: string,
    admin_address: string,
    admin_email: string
}

export interface EditAdmin {
    admin_id: string,
    admin_name: string,
    admin_lastname: string,
    admin_tel: string,
    admin_address: string,
    admin_email: string
}