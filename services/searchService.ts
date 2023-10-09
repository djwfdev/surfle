import { Athlete, Country, RankRange } from '../constants/searchConstants'
import moment from 'moment'
import * as crypto from 'crypto'

const mctAthletes = require('@/public/data/mct.json')
const wctAthletes = require('@/public/data/wct.json')
const countryCodes = require('@/public/data/country_codes.json')

const allAthletes = [...mctAthletes, ...wctAthletes]
const athleteMapping: Record<string, string> = {}

const generateUniqueToken = (athleteName: string) => {
    // Generate a random salt for each athlete
    const salt = crypto.randomBytes(16).toString('hex')
    const combinedString = athleteName + salt

    // Generate a unique token using SHA-256
    return crypto.createHash('sha256').update(combinedString).digest('hex').substring(0, 8)
}

const decodeAthleteToken = (token: string) => {
    return athleteMapping[token]
}

export const generateAndStoreTokens = () => {
    for (const athlete of allAthletes) {
        const token = generateUniqueToken(athlete.name)
        console.log(`Generated token ${token} for athlete ${athlete.name}`)
        athleteMapping[token] = athlete.name
    }
}

export const getAthlete = (athleteHashCode: string) => {
    const nameValue = decodeAthleteToken(athleteHashCode)
    const athlete = allAthletes.find((item: Athlete) => { 
        return nameValue.toLowerCase() == item.name.toLowerCase()
    })
    return processAthletes([athlete])[0]
}

export const getRandomAthlete = () => {
    return processAthletes([allAthletes[Math.floor(Math.random() * allAthletes.length)]])[0]
}

export const getFilteredData = (nameValue: string) => {
    return allAthletes.filter((item: Athlete) => {
        const searchString = nameValue.toLowerCase()
        const name = item.name.toLowerCase()

        return searchString && name.startsWith(searchString) && name !== searchString
    })
}

export const getCountryFromName = (countryName: string) => {
    const code = countryCodes.find((country: Country) => country.name === countryName)?.code

    return { 'name': countryName, 'code': code } as Country
}

export const getAgeFromDob = (dob: string) => {
    return moment().diff(moment(dob, 'DD/MM/YYYY'), 'years')
}

export const getImperialHeight = (height: number) => {
    const feet = Math.floor(height / 30.48)
    const inches = Math.round((height / 2.54) % 12)
    if (inches === 12)
        return `${feet + 1}' 0"`
    else
        return `${feet}' ${inches}"`
}

export const getFormattedRankString: RankRange = (rank) => {
    if (rank >= 1 && rank <= 10)
        return '1-10'
    else if (rank >= 11 && rank <= 20)
        return '11-20'
    else if (rank >= 21 && rank <= 34)
        return '21-34'
    else
        return '-'
}

export const processAthletes = (athletes: Athlete[]) => {
    const processedAthletes = athletes.map((athlete) => {
        return {
            name: athlete.name,
            age: getAgeFromDob(athlete.dob),
            country: getCountryFromName(String(athlete.country)),
            rank: getFormattedRankString(Number(athlete.rank)),
            stance: athlete.stance,
            height: athlete.height,
            gender: athlete.gender,
            img: athlete.img,
            dob: athlete.dob,
            url: athlete.url
        }
    })

    return processedAthletes
}

export const isCountry = (value: any): value is Country => {
    return typeof value === 'object' && value !== null && 'code' in value && 'name' in value
}

export const isHeight = (value: any): value is number => {
    return typeof value === 'number' && value !== null && value > 100
}

export const isRank = (value: any): value is number => {
    return typeof value === 'number' && value !== null && value >= 1 && value <= 34
}
