import React, { useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '../ui/badge'
import { ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { generateUniqueToken, getFilteredData } from '@/services/searchService'
import { Input } from '../ui/input'
import { SearchResults } from '../search/SearchResults'
import { Label } from '../ui/label'
import { toast } from 'sonner'

export const CustomGameDialog = (): JSX.Element => {
    const [value, copy] = useCopyToClipboard()
    const [nameValue, setNameValue] = useState('')
    const [gameCode, setGameCode] = useState('')

    const onSearch = (athlete: any) => {
        setNameValue(athlete.name)
        setGameCode(() => generateUniqueToken(athlete.name))
    }

    const copyUrl = () => {
        copy(`${window.location.href}custom/${gameCode}`)
        toast.success('Copied to clipboard')
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Badge variant='outline' className='cursor-pointer'>
                    <ChevronRight className='h-4 w-4 mr-1' />
                    custom game
                </Badge>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Custom Game</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-2 justify-center pt-4 px-8 relative'>
                    <div>
                        <Input 
                            type='text' 
                            placeholder='Search for an athlete ...' 
                            value={nameValue} 
                            onChange={(e) => setNameValue(e.target.value)} 
                            onFocus={() => setNameValue('')}
                        />
                        <SearchResults onPress={onSearch} athletes={getFilteredData(nameValue, true)} />
                    </div>
                </div>
                {gameCode && (
                    <div className='flex flex-col gap-2 justify-center pt-2 pb-4 px-8'>
                        <Label htmlFor='url'>Here is your custom game link</Label>
                        <Input
                            type='text'
                            id='url'
                            value={`${window.location.href}custom/${gameCode}`}
                            onClick={copyUrl}
                            onFocus={(e) => e.target.select()}
                            readOnly
                        />
                    </div>
                )}
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <Button onClick={copyUrl} disabled={gameCode == ''}>Copy</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
