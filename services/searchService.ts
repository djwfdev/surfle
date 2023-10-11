import { Athlete, Country, CUSTOM_GAME_DIALOG_DROPDOWN_LIMIT, RankRange } from '../constants/searchConstants'
import moment from 'moment'

const mctAthletes = require('@/public/data/mct.json')
const wctAthletes = require('@/public/data/wct.json')
const countryCodes = require('@/public/data/country_codes.json')

const allAthletes = [...mctAthletes, ...wctAthletes]

const generateRandomNonce = (len: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let nonce = ''
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        nonce += characters.charAt(randomIndex)
    }
    return nonce
}

export const generateUniqueToken = (athleteName: string) => {
    const combinedString = generateRandomNonce(4) + athleteName + generateRandomNonce(4)
    return Buffer.from(combinedString, 'binary').toString('base64')
}

const decodeAthleteToken = (token: string) => {
    return Buffer.from(token, 'base64').toString('binary').slice(4, -4)
}

export const getAthlete = (athleteHashCode: string) => {
    const nameValue = decodeAthleteToken(athleteHashCode)
    const athlete = allAthletes.find((item: Athlete) => { 
        return nameValue.toLowerCase().includes(item.name.toLowerCase())
    })
    console.log(athlete)
    return processAthletes([athlete])[0]
}

export const getRandomAthlete = () => {
    return processAthletes([allAthletes[Math.floor(Math.random() * allAthletes.length)]])[0]
}

export const getFilteredData = (nameValue: string, limitResults = false) => {
    let filteredData = allAthletes.filter((item: Athlete) => {
        const searchString = nameValue.toLowerCase()
        const name = item.name.toLowerCase()

        return searchString && name.startsWith(searchString) && name !== searchString
    })

    if (limitResults && filteredData.length > CUSTOM_GAME_DIALOG_DROPDOWN_LIMIT)
        filteredData = filteredData.slice(0, CUSTOM_GAME_DIALOG_DROPDOWN_LIMIT)

    return filteredData
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
