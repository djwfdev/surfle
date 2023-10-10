import React from 'react'
import { CustomGameDialog } from './CustomGameDialog'
import { InfoDialog } from './InfoDialog'
import { SettingsDialog } from './SettingsDialog'
import { UnitsToggle } from './UnitsToggle'

export const Navbar = (): JSX.Element => {
    return (
        <>
            <div className='flex justify-between px-12 pt-12'>
                {/* Logo */}
                <h3 className='text-3xl font-bold leading-tight tracking-tighter'>Surfle</h3>
                {/* Button group */}
                <div className='flex  gap-1'>
                    {/* <SettingsDialog /> */}
                    <InfoDialog />
                    <UnitsToggle />
                </div>
            </div>
            <div className='flex justify-end pb-12 pr-12 pt-3'>
                <CustomGameDialog />
            </div>
        </>
    )
}
