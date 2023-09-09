import { Athlete, Country } from '../constants/searchConstants'

const athletes = require('@/public/data/mct.json')
const countryCodes = require('@/public/data/country_codes.json')

export const getRandomAthlete = (): Athlete => {
    return athletes[Math.floor(Math.random() * athletes.length)]
}

export const checkGuess = (athlete: Athlete, correctAthlete: Athlete): boolean => {
    if (athlete.name == correctAthlete.name) {
        console.log("You won!")
        return true
    }
    return false
}

export const getFilteredData = (nameValue: string): Athlete[] => {
    return athletes.filter((item: Athlete) => {
        const searchString = nameValue.toLowerCase()
        const name = item.name.toLowerCase()

        return searchString && name.startsWith(searchString) && name !== searchString
    })
}

export const getFlagUrlFromName = (countryName: string): string | undefined => {
    let url = ''
    
    fetch('https://flagcdn.com/en/codes.json')
        .then((response: any) => {
            for (const key in response.athletes) {
                if (response.athletes.hasOwnProperty(key) && response.athletes[key] === countryName) {
                    console.log(key)
                    url = `https://flagcdn.com/w20/${key}.png` // Return the first key with a matching value
                }
            }
        })
        .catch((error: any) => {
            console.log(error)
            return undefined
        })

    return url
}
