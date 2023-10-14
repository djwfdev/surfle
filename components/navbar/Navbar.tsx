import Link from 'next/link'
import React from 'react'
import { CustomGameDialog } from './CustomGameDialog'
import { InfoDialog } from './InfoDialog'
import { UnitsToggle } from './UnitsToggle'

export const Navbar = (): JSX.Element => {
    return (
        <nav className='flex flex-col py-4 px-6 sm:px-12'>
            <div className='flex justify-between'>
                <Link className='text-3xl font-bold leading-tight tracking-tighter hover:cursor-pointer' href={'/'}>
                    Surfle
                </Link>
                <div className='flex gap-1'>
                    <InfoDialog />
                    <UnitsToggle />
                </div>
            </div>
            <div className='flex justify-start'>
                <CustomGameDialog />
            </div>
        </nav>
    )
}
