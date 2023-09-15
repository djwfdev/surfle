import { Athlete } from '@/constants/searchConstants'
import React, { ReactElement } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { GuessItemStatCard } from './GuessItemStatCard'
import { getCountryFromName } from '@/services/searchService'

interface GuessProps {
    athletes: Athlete[]
    correctAthlete: Athlete
}

export const GuessItems = ({ athletes, correctAthlete }: GuessProps): JSX.Element => {
    return (
        <>
            {athletes.length > 0 && (
                athletes.map((athlete: Athlete) => (
                    <div className='flex flex-col py-3 z-0' key={athlete.name}>
                        <div className='flex flex-row justify-start items-center gap-3'>
                            <Avatar>
                                <AvatarImage src={athlete.img} alt={athlete.name} />
                                <AvatarFallback>{athlete.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <p className='tracking-wide'>{athlete.name}</p>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-2 mt-4'>
                            <div className='flex flex-row justify-center items-center gap-3'>
                                <GuessItemStatCard label='Age' value={athlete.age} correctValue={correctAthlete.age} />
                                <GuessItemStatCard label='Height' value={athlete.height} correctValue={correctAthlete.height} />
                                <GuessItemStatCard label='Stance' value={athlete.stance} correctValue={correctAthlete.stance} />
                            </div>
                            <div className='flex flex-row justify-center items-center gap-3'>
                                <GuessItemStatCard label='Gender' value={athlete.gender} correctValue={correctAthlete.gender} />
                                <GuessItemStatCard label='Country' value={getCountryFromName(athlete.country)} correctValue={getCountryFromName(correctAthlete.country)} />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    )
}
