import React, { ReactElement } from 'react'
import { Card, CardContent } from '../ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Country } from '@/constants/searchConstants'
import { getImperialHeight, isCountry, isHeight } from '@/services/searchService'
import { FlagImage } from './FlagImage'
import { useSettings } from '@/context/SettingsContext'

interface GuessItemStatCardProps {
    label: string
    value: number | string | Country
    correctValue: number | string | Country
}

export const GuessItemStatCard = ({ label, value, correctValue }: GuessItemStatCardProps): JSX.Element => {
    const { isMetric } = useSettings()

    const formattedValue = (value: number | string | Country) => {
        if (isHeight(value)) {
            return isMetric ? `${value} cm` : getImperialHeight(value)
        }
        else if (isCountry(value))
            return <FlagImage flagCode={value.code} countryName={value.name} />
        else
            return value
    }

    const checkNumber = (number: number, correctValue: number): [string, ReactElement] => {
        const notCorrectColour = Math.abs(number - correctValue) <= (isHeight(number) ? 5 : 3) ? 'bg-amber-500' : 'bg-gray-100'
        const icon = number === correctValue ? <></> : number > correctValue ? <ChevronDown /> : <ChevronUp />

        return [number === correctValue ? 'bg-green-700 text-white' : notCorrectColour, icon || <></>]
    }

    const checkString = (text: string, correctText: string): string => {
        return text === correctText ? 'bg-green-700 text-white' : 'bg-gray-100'
    }

    // concise if-else block
    const [cardClassName, icon] = typeof value === 'number'
        ? checkNumber(Number(value), Number(correctValue))
        : (isCountry(value) && isCountry(correctValue)) ? [checkString(value.code, correctValue.code), null]
            : [checkString(String(value), String(correctValue)), null]

    return (
        <Card className='drop-shadow-sm'>
            <CardContent className={`h-22 flex flex-col items-center justify-center py-[9.75px] rounded ${cardClassName}`}>
                <p className='tracking-wide font-bold'>{label}</p>
                <div className='flex flex-row gap-1'>
                    <p>{formattedValue(value)}</p>
                    {icon}
                </div>
            </CardContent>
        </Card>
    )
}
