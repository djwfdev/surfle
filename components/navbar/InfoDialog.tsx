import React, { ReactElement } from 'react'
import { Info } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent } from '../ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'
import { getImperialHeight } from '@/services/searchService'

interface InfoCardProps {
    title: string
    description: ReactElement
    value: string | number
    icon?: ReactElement
    textAlignLeft?: boolean
    isGreen?: boolean
}

const InfoCard = ({ title, description, value, icon, textAlignLeft, isGreen }: InfoCardProps) => {
    return (
        <Card>
            <CardContent className='flex  justify-start p-2 gap-2 items-center'>
                {textAlignLeft && <div>{description}</div>}
                <Card className='h-22'>
                    <CardContent className={`h-22 w-max flex flex-col items-center justify-center py-[9.75px] rounded ${isGreen ? 'bg-green-700 text-white' : 'bg-amber-500'}`}>
                        <p className='tracking-wide font-bold'>{title}</p>
                        <div className='flex  gap-1'>
                            <p>{value}</p>
                            {icon}
                        </div>
                    </CardContent>
                </Card>
                {!textAlignLeft && <div>{description}</div>}
            </CardContent>
        </Card>
    )
}

export const InfoDialog = (): JSX.Element => {
    const { isMetric } = useSettings()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <Info className='h-6 w-6' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Guide</DialogTitle>
                </DialogHeader>
                <InfoCard
                    title='Age'
                    description={<p>The age of the surfer will turn orange if the guess is within <b>3 years</b> of the unknown surfers age.</p>}
                    value={25}
                    icon={<ChevronDown />}
                />
                <InfoCard
                    title='Height'
                    description={<p>The height of the surfer will turn orange if the guess is within <b>{isMetric ? '5 cm' : '2 inches'}</b> of the unknown surfers height.</p>}
                    value={isMetric ? '173 cm' : getImperialHeight(173)}
                    icon={<ChevronUp />}
                    textAlignLeft
                />
                <InfoCard
                    title='Rank'
                    description={<p>All other fields will not turn orange; they will only turn green if the attribute <b>exactly</b> matches the unknown surfers attribute.</p>}
                    value='1-10'
                    isGreen
                />
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Ok</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
