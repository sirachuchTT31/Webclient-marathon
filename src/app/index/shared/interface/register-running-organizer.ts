export interface CreateEvent {
    name: string
    due_date: Date,
    price: string,
    max_amount: string,
    detail: string,
    distance: string,
    path_image?: string,
    location_id: string
    auth_id: string
}

interface EventArray {
    id: number
    is_active: boolean
    status_code: string
}
export interface UpdateEvent {
    update_event: EventArray[]
}
export interface UpdateregisterrunningOrganizer {
    reg_event_id: string
    reg_event_name?: string
    reg_event_due_date?: Date,
    reg_event_price?: string,
    reg_event_amount?: string,
    reg_event_detail?: string,
    reg_event_distance?: string,
    location_id?: string
}
export interface UpdateApprovedEventRegister {
    event_join_id: number
    status: string
    user_id : number
}

