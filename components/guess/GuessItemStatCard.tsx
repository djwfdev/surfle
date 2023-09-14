import React, { ReactElement } from 'react'
import { Card, CardContent } from '../ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'
import { Country } from '@/constants/searchConstants'

interface GuessItemStatCardProps {
    label: string
    value: number | string | Country
    correctValue: number | string | Country
}

export const GuessItemStatCard = ({ label, value, correctValue }: GuessItemStatCardProps): JSX.Element => {
    const { isMetric } = useSettings();

    const formattedValue = (value: number | string | Country) => {
        if (typeof value === 'number' && Number(value) > 100) {
            const feet = Math.floor(value / 30.48)
            const inches = Math.round((value / 2.54) % 12)
            if (inches === 12)
                return isMetric ? `${value} cm` : `${feet + 1}' 0"`;
            else 
                return isMetric ? `${value} cm` : `${feet}' ${inches}"`;
        } else if (typeof value === 'string') {
            return value
        } else if (typeof value === 'object' && value !== null && 'code' in value) {
            return (value as Country).name
        } else {
            return value
        }
    }

    const checkNumber = (number: number, correctValue: number): [string, ReactElement] => {
        const amber = Math.abs(number - correctValue) <= (number > 100 ? 6 : 3) ? 'bg-amber-500' : ''
        const icon = number === correctValue ? <></> : number > correctValue ? <ChevronDown /> : <ChevronUp />

        return [number === correctValue ? 'bg-green-700 text-white' : amber, icon || <></>]
    }

    const checkString = (text: string, correctText: string): string => {
        return text === correctText ? 'bg-green-700 text-white' : ''
    }

    const [cardClassName, icon] = typeof value === 'number'
        ? checkNumber(Number(value), Number(correctValue))
        : [checkString(value as string, correctValue as string), null]

    return (
        <Card>
            <CardContent className={`h-20 ${typeof value === 'number' ? 'w-26' : 'w-34'} flex flex-col items-center gap-2 py-[9.75px] rounded ${cardClassName}`}>
                <p className='tracking-wide font-bold'>{label}</p>
                <div className='flex flex-row gap-1'>
                    {formattedValue(value)}
                    {icon}
                </div>
            </CardContent>
        </Card>
    )
}
