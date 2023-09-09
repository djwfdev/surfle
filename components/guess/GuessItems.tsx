import { Athlete } from '@/constants/searchConstants'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

interface GuessProps {
    athletes: Athlete[]
}

export const GuessItems = ({ athletes }: GuessProps): JSX.Element => {
    return (
        <>
            {athletes.length > 0 && (
                <Card className='p-2 z-0'>
                    {athletes.map((athlete: Athlete) => (
                        <CardContent className='flex flex-column p-1' key={athlete.name}>
                            <div className='flex flex-row justify-start gap-3 w-full'>
                                <Avatar>
                                    <AvatarImage src={athlete.img} alt={athlete.name} />
                                    <AvatarFallback>{athlete.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <p className='text-base'>{athlete.name}</p>
                            </div>
                        </CardContent>
                    ))}
                </Card>
            )}
        </>
    )
}
