import React from 'react'
import { AlertTriangle, Settings2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardHeader } from '../ui/card'

export const SettingsDialog = (): JSX.Element => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon' disabled>
                    <Settings2 className='h-6 w-6' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <Card>
                    <CardHeader className='flex gap-2 justify-center items-center'>
                        <AlertTriangle className='h-6 w-6' />
                        {/* TODO: Add settings? */}
                    </CardHeader>
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
