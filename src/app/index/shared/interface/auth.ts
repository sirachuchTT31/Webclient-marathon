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

export interface RefreshToken {
    refreshToken: string
}