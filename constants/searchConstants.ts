export interface Athlete {
    name: string
    country: string | Country
    rank: number | string
    stance: string
    dob: string
    height: number
    gender: string
    url: string
    img: string
    age: number
}

export interface Country {
    code: string
    name: string
}

export interface RankRange {
    (rank: number): string
}

export const MAX_GUESSES = 6
export const CUSTOM_GAME_DIALOG_DROPDOWN_LIMIT = 6
export const BASE_URL = 'http://localhost:3000/custom/'
