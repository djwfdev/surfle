import { Athlete } from '@/constants/searchConstants'
import { useEffect, useState } from 'react'
import { getAgeFromDob, getCountryFromName, getFormattedRankString } from '@/services/searchService'

export function useAthletePreprocessing(athletes: Athlete[]) {
    const [preprocessedAthlete, setPreprocessedAthlete] = useState<Athlete[]>([])

    useEffect(() => {
        const processedAthlete = athletes.map((athlete) => {
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

        setPreprocessedAthlete(processedAthlete)
    }, [athletes])

    return preprocessedAthlete
}
