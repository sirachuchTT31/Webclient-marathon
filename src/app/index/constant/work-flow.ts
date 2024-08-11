export enum StatusOrganizer {
    WAIT_FOR_APPROVED = 'N',
    APPROVED_SUCCESS = 'Y',
    BLOCK = 'B',
    REJECT = 'RJ'
}

export enum StatusEvent {
    WAIT_FOR_APPROVED = '01',
    APPROVED_SUCCESS = '02',
    REJECT = '03',
    CANCEL = '04',
    FINISH = '05'
}

export enum StatusUserRegisterEvent {
    WAIT_FOR_APPROVED = '11',
    WAIT_FOR_PAYMENT = '12',
    REJECT = '13',
    APPROVED_SUCCESS = '14',
    SAVE = '15',
    CANCEL = '00'
}