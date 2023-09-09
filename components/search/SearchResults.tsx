import React, { useState } from 'react'
import { Athlete } from '@/constants/searchConstants'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { getFlagUrlFromName } from '@/services/searchService'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface SearchResultsProps {
    onPress(athlete: Athlete): void
    athletes: Athlete[]
}

export const SearchResults = ({ onPress, athletes }: SearchResultsProps): JSX.Element => {
    return (
        <>
            {athletes.length > 0 && (
                <Card className='p-2 mt-2 z-50 w-[86%] absolute bg-background/90 backdrop-blur-sm'>
                    {athletes.map((athlete: Athlete) => (
                        <CardContent className='flex flex-column p-1' key={athlete.name}>
                            <Button className='flex flex-row justify-start gap-3 w-full h-13' variant='ghost' onClick={() => onPress(athlete)}>
                                <Avatar>
                                    <AvatarImage src={athlete.img} alt={athlete.name} />
                                    <AvatarFallback>{athlete.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <p className='text-base'>{athlete.name}</p>
                            </Button>
                        </CardContent>
                    ))}
                </Card>
            )}
        </>
    )
}
