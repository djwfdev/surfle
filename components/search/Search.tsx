import React, { useState, useLayoutEffect } from 'react'
import { Input } from '../ui/input'
import { SearchResults } from './SearchResults'
import { Athlete } from '@/constants/searchConstants'
import Confetti from 'react-confetti'
import { checkGuess, getFilteredData, getRandomAthlete } from '@/services/searchService'
import { GuessItems } from '../guess/GuessItems'

export const Search = (): JSX.Element => {
    const [correctAthlete, setCorrectAthlete] = useState({} as Athlete)
    const [hasUserWon, setHasUserWon] = useState(false)
    const [nameValue, setNameValue] = useState('')
    const [allGuesses, setAllGuesses] = useState<Athlete[]>([])

    const onChange = (event: any) => {
        setNameValue(event.target.value);
    }

    const onSearch = (athlete: Athlete) => {
        setNameValue(athlete.name)
        setAllGuesses(prevGuesses => [athlete, ...prevGuesses])
        setHasUserWon(checkGuess(athlete, correctAthlete))
    }

    useLayoutEffect(() => {
        setCorrectAthlete(getRandomAthlete())
    }, [])

    return (
        hasUserWon ? (
            <Confetti
                width={window.outerWidth}
                height={window.outerHeight}
            />
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
                    <GuessItems athletes={allGuesses} />
                ) : <></>}
            </div>
        )
    )
}
