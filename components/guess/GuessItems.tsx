import { Athlete } from '@/constants/searchConstants'
import React, { ReactElement } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface GuessProps {
    athletes: Athlete[]
    correctAthlete: Athlete
}

export const GuessItems = ({ athletes, correctAthlete }: GuessProps): JSX.Element => {

    const checkNumber = (number: number, correctValue: number): [string, ReactElement] => {
        const amber = Math.abs(number - correctValue) <= (number > 100 ? 6: 3) ? 'bg-amber-500' : ''
        const icon = number === correctValue ? <></> : number > correctValue ? <ChevronDown /> : <ChevronUp />

        return [number === correctValue ? 'bg-green-700 text-white' : amber, icon || <></>]
    }

    const checkString = (text: string, correctText: string): string => {
        return text === correctText ? 'bg-green-700 text-white' : ''
    }

    return (
        <>
            {athletes.length > 0 && (
                athletes.map((athlete: Athlete) => (
                    <div className='flex flex-col py-3 z-0' key={athlete.name}>
                        <div className='flex flex-row justify-start items-center gap-3 w-full'>
                            <Avatar>
                                <AvatarImage src={athlete.img} alt={athlete.name} />
                                <AvatarFallback>{athlete.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <p className='tracking-wide'>{athlete.name}</p>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-3 mt-4 w-full'>
                            <Card>
                                <CardContent className={`h-20 w-24 flex flex-col items-center gap-2 py-[9.75px] rounded ${checkNumber(athlete.age, correctAthlete.age)[0]}`}>
                                    <p className='tracking-wide font-bold'>Age</p>
                                    <div className='flex flex-row gap-1'>
                                        <p className='tracking-wide'>{athlete.age}</p>
                                        {checkNumber(athlete.age, correctAthlete.age)[1]}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className={`h-20 w-34 flex flex-col items-center gap-2 py-[9.75px] rounded ${checkNumber(athlete.height, correctAthlete.height)[0]}`}>
                                    <p className='tracking-wide font-bold'>Height</p>
                                    <div className='flex flex-row gap-1'>
                                        <p className='tracking-wide'>{athlete.height}  cm</p>
                                        {checkNumber(athlete.height, correctAthlete.height)[1]}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className={`h-20 w-24 flex flex-col items-center gap-2 py-[9.75px] rounded ${checkString(athlete.stance, correctAthlete.stance)}`}>
                                    <p className='tracking-wide font-bold'>Stance</p>
                                    <div className='flex flex-row gap-1'>
                                        <p className='tracking-wide'>{athlete.stance}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))
            )}
        </>
    )
}
