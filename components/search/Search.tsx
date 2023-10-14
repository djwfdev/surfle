import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Input } from '../ui/input'
import { SearchResults } from './SearchResults'
import { Athlete, MAX_GUESSES } from '@/constants/searchConstants'
import { getAthlete, getFilteredData, getIOSInputEventHandlers, getRandomAthlete, processAthletes } from '@/services/searchService'
import { GuessItems } from '../guess/GuessItems'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import ConfettiExplosion from 'react-confetti-explosion'

interface SearchProps {
    athleteHashCode?: string
}

export const Search = ({ athleteHashCode }: SearchProps): JSX.Element => {
    const [correctAthlete, setCorrectAthlete] = useState({} as Athlete)
    const [hasUserWon, setHasUserWon] = useState(false)
    const [hasUserLost, setHasUserLost] = useState(false)
    const [nameValue, setNameValue] = useState('')
    const [navigatorPlatform, setNavigatorPlatform] = useState('')
    const [allGuesses, setAllGuesses] = useState<Athlete[]>([])
    const [processedGuesses, setProcessedGuesses] = useState<Athlete[]>([])

    const onSearch = (athlete: Athlete) => {
        setNameValue('')
        setAllGuesses((prevGuesses) => [athlete, ...prevGuesses])
        setHasUserWon(athlete.name == correctAthlete.name)
        setHasUserLost(allGuesses.length + 1 >= MAX_GUESSES)
    }

    const restartGame = () => {
        setHasUserWon(false)
        setHasUserLost(false)
        setNameValue('')
        setAllGuesses([])
        setProcessedGuesses([])
        if (athleteHashCode) {
            setCorrectAthlete(() => getAthlete(athleteHashCode))
        } else {
            setCorrectAthlete(() => getRandomAthlete())
        }
    }

    useLayoutEffect(() => {
        if (athleteHashCode) {
            setCorrectAthlete(() => getAthlete(athleteHashCode))
        } else {
            setCorrectAthlete(() => getRandomAthlete())
        }
        setNavigatorPlatform(navigator.platform)
    }, [])

    useEffect(() => {
        setProcessedGuesses(processAthletes(allGuesses))
    }, [allGuesses])

    return (
        <section className='flex flex-col items-center justify-center gap-2'>
            {hasUserWon && (
                <Card className='w-5/12 sm:w-7/12 mt-8'>
                    <CardContent className='flex flex-col items-center gap-2 p-6'>
                        <h3 className='text-2xl font-semibold tracking-tight text-green-800'>You won!</h3>
                        <img className='mb-2' src='../img/trophy.gif' alt='trophy' />
                        <ConfettiExplosion force={0.7} duration={3200} particleCount={200} width={window.innerWidth / 1.1} />
                        <p className='tracking-wide'>
                            It was{' '}
                            <a className='text-blue-600 hover:text-blue-800 font-semibold underline' href={correctAthlete.url} target='_blank'>
                                {correctAthlete.name}
                            </a>
                        </p>
                        <div className='flex gap-4 mt-6'>
                            <Button onClick={restartGame}>Play Again</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
            {hasUserLost && (
                <Card className='w-5/12 sm:w-7/12 mt-8'>
                    <CardContent className='flex flex-col items-center gap-2 p-6'>
                        <h3 className='text-2xl font-semibold tracking-tight text-red-900'>You lost :/</h3>
                        <p className='tracking-wide py-4'>
                            It was{' '}
                            <a className='text-blue-600 hover:text-blue-800 font-semibold underline' href={correctAthlete.url} target='_blank'>
                                {correctAthlete.name}
                            </a>
                        </p>
                        <div className='flex gap-4 mt-2'>
                            <Button onClick={restartGame}>Play Again</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
            {!hasUserWon && !hasUserLost && (
                <div className='w-112 flex flex-col gap-2 justify-center sm:py-10 px-10 relative'>
                    <div className='flex justify-between mr-1 text-sm'>
                        <p className='font-semibold'>{allGuesses.length + 1 == MAX_GUESSES && 'Last guess!'}</p>
                        <p>{`Guess ${allGuesses.length + 1} of ${MAX_GUESSES}`}</p>
                    </div>
                    <div>
                        <Input
                            className='focus:placeholder-transparent' 
                            type='text' 
                            placeholder={'Search for an athlete ...'}
                            value={nameValue} 
                            onChange={(e) => setNameValue(e.target.value)}
                            {...getIOSInputEventHandlers(/iPad|iPhone|iPod/.test(navigatorPlatform))} 
                        />
                        <SearchResults onPress={onSearch} athletes={getFilteredData(nameValue)} />
                    </div>
                    {allGuesses?.length != 0 ? <GuessItems athletes={processedGuesses} correctAthlete={correctAthlete} /> : <></>}
                </div>
            )}
            {allGuesses.length == 0 && (
                <div className='w-112 flex justify-center items-center p-12 m-auto'>
                    <Card>
                        <CardContent className='flex flex-col items-center gap-4 p-6 text-center'>
                            <p className='tracking-wide font-semibold'>Welcome to Surfle!</p>
                            <p className='tracking-wide'>The surfing themed wordle game.</p>
                            <p className='tracking-wide'>
                                As you make guesses, you will discover hints that should lead you to the correct surfer. Make your initial prediction using the
                                search box above. Best of luck :)
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </section>
    )
}
