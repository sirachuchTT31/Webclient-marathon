export interface createAdmin {
    username: string
    password: string
    name: string
    lastname: string
    email: string
    address: string
    telephone: string
}
export interface updateAdmin {
    id: number
    name: string
    lastname: string
    email: string
    address: string
    telephone: string
}
export interface deleteAdmin {
    id: number
}

export interface createOrganizer {
    username: string
    password: string
    name: string
    lastname: string
    email: string
    address: string
    telephone: string
}

export interface updateOrganizer {
    id: number
    name: string
    lastname: string
    email: string
    address: string
    telephone: string
}

export interface deleteOrganizer {
    id: number
}

export interface createMember {
    username: string
    password: string
    name: string
    lastname: string
    email: string
    address: string
    telephone: string
}

export interface updateMember {
    id: number
    name: string
    lastname: string
    email: string
    address: string
    telephone: string
}

export interface deleteMember {
    id: number
}

export interface createMasterLocation {
    province: string
    district: string
    zipcode: string
    address: string
    is_active : boolean
}
export interface updateMasterLocation  {
    id : number
    province: string
    district: string
    zipcode: string
    address: string
    is_active : boolean
}

export interface deleteMasterLocation  {
    id: number
}



export interface updateEvent {
    event_id: number
    status: string
}