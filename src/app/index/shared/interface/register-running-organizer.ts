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

export interface Updatestatusbeforerejectevent {
    reg_event_status: string
    reg_event_id: string
}