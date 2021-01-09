
export interface relationship{
    id: number
    type: string
}

export interface foodPref {
    id: number
    food_type: string
    notes: string
}

export interface allergies{
    id: number
    allergy: string
}

export interface rsvpForm {
    name: string
    email: string
    tokenId: string
    relationshipId: number
    foodId: number
    allergyId: number
}