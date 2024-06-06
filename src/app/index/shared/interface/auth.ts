export interface Registermember {
    username?: string,
    password?: string,
    name?: string,
    lastname?: string,
    email?: string
}
export interface Registerorganizer {
    username?: string,
    password?: string,
    name?: string,
    lastname?: string,
    email?: string
}

export interface Login {
    username?: string,
    password?: string
}

export interface Logout{
    authen_log_id : number
}

export interface RefreshToken {
    refreshToken: string
}