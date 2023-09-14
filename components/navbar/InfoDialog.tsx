import React from 'react'
import { Info } from 'lucide-react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

export const InfoDialog = (): JSX.Element => {
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
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Ok</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
