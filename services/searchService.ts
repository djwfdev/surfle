import { useAthletePreprocessing } from '@/hooks/useAthleteProcessing'
import { Athlete, Country, RankRange } from '../constants/searchConstants'
import moment from 'moment'

const mctAthletes = require('@/public/data/mct.json')
const wctAthletes = require('@/public/data/wct.json')
const countryCodes = require('@/public/data/country_codes.json')

const allAthletes = [...mctAthletes, ...wctAthletes]

export const getRandomAthlete = () => {
    return useAthletePreprocessing([allAthletes[Math.floor(Math.random() * allAthletes.length)]])[0]
}

export const checkGuess = (athlete: Athlete, correctAthlete: Athlete) => {
    if (athlete.name == correctAthlete.name) {
        console.log('You won!')
        return true
    }
    return false
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
    return moment().diff(moment(dob, 'DD/MM/YYYY'), 'years');
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
};

export const isCountry = (value: any): value is Country => {
    return typeof value === 'object' && value !== null && 'code' in value && 'name' in value
}

export const isHeight = (value: any): value is number => {
    return typeof value === 'number' && value !== null && value > 100
}

export const isRank = (value: any): value is number => {
    return typeof value === 'number' && value !== null && value >= 1 && value <= 34
}
