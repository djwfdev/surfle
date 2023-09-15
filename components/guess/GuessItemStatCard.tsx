import React, { ReactElement } from 'react'
import { Card, CardContent } from '../ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'
import { Country } from '@/constants/searchConstants'
import Image from 'next/image'

interface GuessItemStatCardProps {
    label: string
    value: number | string | Country
    correctValue: number | string | Country
}

export const GuessItemStatCard = ({ label, value, correctValue }: GuessItemStatCardProps): JSX.Element => {
    const { isMetric } = useSettings();

    const isCountry = (value: number | string | Country): value is Country => {
        return typeof value === 'object' && value !== null && 'code' in value && 'name' in value
    }

    const formattedValue = (value: number | string | Country) => {
        if (typeof value === 'number' && Number(value) > 100) {
            const feet = Math.floor(value / 30.48)
            const inches = Math.round((value / 2.54) % 12)
            if (inches === 12)
                return isMetric ? `${value} cm` : `${feet + 1}' 0"`;
            else
                return isMetric ? `${value} cm` : `${feet}' ${inches}"`;
        } 
        else if (typeof value === 'string')
            return value
        else if (isCountry(value))
            return <img src={`https://flagsapi.com/${value.code}/flat/48.png`} alt={value.name}/>
        else
            return value
    }

    const checkNumber = (number: number, correctValue: number): [string, ReactElement] => {
        const amber = Math.abs(number - correctValue) <= (number > 100 ? 6 : 3) ? 'bg-amber-500' : ''
        const icon = number === correctValue ? <></> : number > correctValue ? <ChevronDown /> : <ChevronUp />

        return [number === correctValue ? 'bg-green-700 text-white w-28' : amber, icon || <></>]
    }

    const checkString = (text: string, correctText: string): string => {
        return text === correctText ? 'bg-green-700 text-white' : ''
    }

    const [cardClassName, icon] = typeof value === 'number'
        ? checkNumber(Number(value), Number(correctValue))
        : (isCountry(value) && isCountry(correctValue)) ? [checkString(value.code, correctValue.code), null] 
        : [checkString(value as string, correctValue as string), null]

    return (
        <Card>
            <CardContent className={`h-24 flex flex-col items-center justify-center gap-1 py-[9.75px] rounded ${cardClassName}`}>
                <p className='tracking-wide font-bold'>{label}</p>
                <div className='flex flex-row gap-1'>
                    {formattedValue(value)}
                    {icon}
                </div>
            </CardContent>
        </Card>
    )
}
