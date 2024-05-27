export interface createAdmin {
    username: string
    password: string
    name: string
    lastname: string
    email: string
    address : string
    telephone : string
}
export interface updateAdmin {
    id : number
    name: string
    lastname: string
    email: string
    address : string
    telephone : string
}
export interface deleteAdmin {
    id : number
}
export interface updateEvent {
    transaction_id : number 
    status : string
}