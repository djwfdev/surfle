import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export interface FlagImageProps {
    flagCode: string
    countryName: string
}

export const FlagImage = ({ flagCode, countryName }: FlagImageProps): JSX.Element => {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <img src={`https://flagsapi.com/${flagCode}/flat/48.png`} alt={countryName} />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p>{countryName}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
