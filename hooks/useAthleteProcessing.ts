import { Athlete } from '@/constants/searchConstants'
import { getAgeFromDob, getCountryFromName, getFormattedRankString } from '@/services/searchService'

export function useAthletePreprocessing(athletes: Athlete[]) {
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
