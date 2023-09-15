import { Athlete, Country } from '../constants/searchConstants'

const mctAthletes = require('@/public/data/mct.json')
const wctAthletes = require('@/public/data/wct.json')
const countryCodes = require('@/public/data/country_codes.json')

const allAthletes = [...mctAthletes, ...wctAthletes];

export const getRandomAthlete = (): Athlete => {
    return allAthletes[Math.floor(Math.random() * allAthletes.length)]
}

export const checkGuess = (athlete: Athlete, correctAthlete: Athlete) => {
    if (athlete.name == correctAthlete.name) {
        console.log("You won!")
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

    return {'name': countryName, 'code': code} as Country
}
