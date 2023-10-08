import React from 'react'
import { Info } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'
import { getImperialHeight } from '@/services/searchService'

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
                    <DialogTitle>Attributes</DialogTitle>
                </DialogHeader>
                <Card>
                    <CardContent className='flex flex-row justify-start p-2 gap-2'>
                        <Card>
                            <CardContent className='h-22 flex flex-col items-center justify-center py-[9.75px] rounded bg-amber-500'>
                                <p className='tracking-wide font-bold'>Age</p>
                                <div className='flex flex-row gap-1'>
                                    <p>25</p>
                                    <ChevronDown />
                                </div>
                            </CardContent>
                        </Card>
                        <div>
                            The age of the surfer will turn yellow if the guess is 
                            within <b>3 years</b> of the unknown surfer's age.
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='flex flex-row justify-start p-2 gap-2'>
                        <div>
                            The height of the surfer will turn yellow if the guess is 
                            within <b>{isMetric ? '5 cm' : '2 inches'}</b> of the unknown surfer's height.
                        </div>
                        <Card>
                            <CardContent className='h-22 w-max flex flex-col items-center justify-center py-[9.75px] rounded bg-amber-500'>
                                <p className='tracking-wide font-bold'>Height</p>
                                <div className='flex flex-row gap-1'>
                                    <p>{isMetric ? '168 cm' : getImperialHeight(168)}</p>
                                    <ChevronUp />
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Ok</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
