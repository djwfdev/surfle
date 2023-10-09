import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Input } from '../ui/input'
import { SearchResults } from './SearchResults'
import { Athlete, MAX_GUESSES } from '@/constants/searchConstants'
import { generateAndStoreTokens, getAthlete, getFilteredData, getRandomAthlete, processAthletes } from '@/services/searchService'
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
    const [allGuesses, setAllGuesses] = useState<Athlete[]>([])
    const [processedGuesses, setProcessedGuesses] = useState<Athlete[]>([])

    const onChange = (event: any) => {
        setNameValue(event.target.value)
    }

    const onSearch = (athlete: Athlete) => {
        setNameValue('')
        setAllGuesses((prevGuesses) => [athlete, ...prevGuesses])
        setHasUserWon(athlete.name == correctAthlete.name)
        setHasUserLost(allGuesses.length + 1 >= MAX_GUESSES)
        console.log(correctAthlete.name)
    }

    const restartGame = () => {
        setHasUserWon(false)
        setHasUserLost(false)
        setNameValue('')
        setAllGuesses([])
        setProcessedGuesses([])
        setCorrectAthlete(() => getRandomAthlete())
    }

    useLayoutEffect(() => {
        if (athleteHashCode) {
            generateAndStoreTokens()
            setCorrectAthlete(() => getAthlete(athleteHashCode))
        } else {
            setCorrectAthlete(() => getRandomAthlete())
        }
    }, [])

    useEffect(() => {
        setProcessedGuesses(processAthletes(allGuesses))
    }, [allGuesses])

    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            {hasUserWon && (
                <Card className='w-7/12'>
                    <CardContent className='flex flex-col items-center gap-2 p-6'>
                        <h3 className='text-2xl font-semibold tracking-tight text-green-800'>You won!</h3>
                        <img className='mb-2' src='img/trophy.gif'></img>
                        <ConfettiExplosion
                            force={0.7}
                            duration={3200}
                            particleCount={200}
                            width={window.innerWidth / 1.1}
                        />
                        <p className='tracking-wide'>
                            It was <a className='text-blue-600 hover:text-blue-800 font-semibold underline' href={correctAthlete.url} target='_blank'>
                                {correctAthlete.name}
                            </a>
                        </p>
                        <div className='flex gap-4 mt-6'>
                            {/* TODO: Add custom games? */}
                            {/* <Button variant='outline' onClick={restartGame}>Custom Game</Button> */}
                            <Button onClick={restartGame}>Play Again</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
            {hasUserLost && (
                <Card className='w-7/12'>
                    <CardContent className='flex flex-col items-center gap-2 p-6'>
                        <h3 className='text-2xl font-semibold tracking-tight text-red-900'>You lost :/</h3>
                        <p className='tracking-wide py-4'>
                            It was <a className='text-blue-600 hover:text-blue-800 font-semibold underline' href={correctAthlete.url} target='_blank'>
                                {correctAthlete.name}
                            </a>
                        </p>
                        <div className='flex gap-4 mt-2'>
                            {/* TODO: Add custom games? */}
                            {/* <Button variant='outline' onClick={restartGame}>Custom Game</Button> */}
                            <Button onClick={restartGame}>Play Again</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
            {!hasUserWon && !hasUserLost && (
                <div className='w-112 flex flex-col gap-2 justify-center p-8 m-auto relative'>
                    <div className='flex justify-between mb-2 mr-1 text-sm'>
                        <p className='font-semibold'>{allGuesses.length + 1 == MAX_GUESSES && 'Last guess!'}</p>
                        <p>{`Guess ${allGuesses.length + 1} of ${MAX_GUESSES}`}</p>
                    </div>
                    <div>
                        <Input type='text' placeholder='Search for an athlete ...' value={nameValue} onChange={onChange} />
                        <SearchResults onPress={onSearch} athletes={getFilteredData(nameValue)} />
                    </div>
                    {allGuesses?.length != 0 ? <GuessItems athletes={processedGuesses} correctAthlete={correctAthlete} /> : <></>}
                </div>
            )}
            {allGuesses.length == 0 && (
                <Card className='w-96'>
                    <CardContent className='flex flex-col items-center gap-4 p-6 text-center'>
                        <p className='tracking-wide font-semibold'>Welcome to Surfle!</p>
                        <p className='tracking-wide'>The surfing themed wordle game.</p>
                        <p className='tracking-wide'>As you make guesses, you will discover hints that should lead you to the correct surfer.
                        Make your initial prediction using the search box above. Best of luck :)</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
