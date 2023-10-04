import React, { useState, useLayoutEffect, useEffect, useCallback, use } from 'react'
import { Input } from '../ui/input'
import { SearchResults } from './SearchResults'
import { Athlete } from '@/constants/searchConstants'
import { checkGuess, getFilteredData, getRandomAthlete } from '@/services/searchService'
import { GuessItems } from '../guess/GuessItems'
import { useAthletePreprocessing } from '@/hooks/useAthleteProcessing'
import ConfettiExplosion from 'react-confetti-explosion'
import { Button } from '../ui/button'

export const Search = (): JSX.Element => {
    const [correctAthlete, setCorrectAthlete] = useState({} as Athlete)
    const [hasUserWon, setHasUserWon] = useState(false)
    const [nameValue, setNameValue] = useState('')
    const [allGuesses, setAllGuesses] = useState<Athlete[]>([])
    const [processedGuesses, setProcessedGuesses] = useState<Athlete[]>([])

    const onChange = (event: any) => {
        setNameValue(event.target.value)
    }

    const onSearch = (athlete: Athlete) => {
        setNameValue('')
        setAllGuesses(prevGuesses => [athlete, ...prevGuesses])
        setHasUserWon(checkGuess(athlete, correctAthlete))
    }

    const restartGame = () => {
        setHasUserWon(false)
        setNameValue('')
        setAllGuesses([])
        setProcessedGuesses([])
        setCorrectAthlete(() => getRandomAthlete())
    }

    useLayoutEffect(() => {
        setCorrectAthlete(() => getRandomAthlete())
    }, [])

    useEffect(() => {
        setProcessedGuesses(useAthletePreprocessing(allGuesses))
        console.table(correctAthlete)
    }, [allGuesses])

    return (
        <div className='flex items-center justify-center'>
            {hasUserWon ? (
                <>
                    <ConfettiExplosion
                        force={0.7}
                        duration={3000}
                        particleCount={200}
                        width={window.innerWidth / 1.2}
                    />
                    <h1>You won!</h1>
                    <Button onClick={restartGame}>Play Again</Button>
                </>
            ) : (
                <div className='w-112 flex flex-col gap-2 justify-center p-8 m-auto relative'>
                    <div className='flex justify-end mb-2 mr-1 text-sm'>
                        {'Guess ' + allGuesses.length + ' of 10'}
                    </div>
                    <div>
                        <Input
                            type='text'
                            placeholder="Search for an athlete ..."
                            value={nameValue}
                            onChange={onChange}
                        />
                        <SearchResults onPress={onSearch} athletes={getFilteredData(nameValue)} />
                    </div>
                    {allGuesses?.length != 0 ? (
                        <GuessItems athletes={processedGuesses} correctAthlete={correctAthlete} />
                    ) : <></>}
                </div>
            )}
        </div>
    )
}
