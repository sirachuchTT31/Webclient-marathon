export interface Registermember {
    member_username?: string,
    member_password?: string,
    member_name?: string,
    member_lastname?: string,
    member_email?: string
}
export interface Registerorganizer {
    organ_username?: string,
    organ_password?: string,
    organ_name?: string,
    organ_lastname?: string,
    organ_email?: string
}

export interface Login {
    username?: string,
    password?: string
}

export interface RefreshToken {
    refreshToken: string
}