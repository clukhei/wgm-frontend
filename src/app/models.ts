import { StringifyOptions } from "querystring";
import { StringLiteralLike } from "typescript";


export interface relationship {
    id: number
    type: string
}

export interface foodPref {
    id: number
    food_type: string
    notes: string
}

export interface allergies {
    id: number
    allergy: string
}

export interface rsvpForm {
    name: string
    email: string
    tokenId: string
    foodId: number
    allergyId: number
}
export interface invitedNames {
    tokenId: string
    rep_name: string
}
export interface invitedGuest extends invitedNames {
    valid: number
    created_at: string
    updated_at: string

}
export interface attendingGuest {
    id: number
    first_name: string
    last_name: string
    tableNo: number
    email: string
    type: string
    allergy: string
    food_type: string
}

export interface generateToken {
    repName: string
    tokenId: string
    valid: boolean
}

export interface loginSuccess {
    message: string
    token: string
    userName: string
    loginTime: string
}

export interface paymentBody{
    unit_amount: number
    name: string
    id: number
}

export interface GuestNames{
    first_name: string
    last_name: string
    id: number
}