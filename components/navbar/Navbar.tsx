import React from 'react'
import { InfoDialog } from './InfoDialog';
import { UnitsToggle } from './UnitsToggle';

export const Navbar = (): JSX.Element => {
    return (
        <div className='flex justify-between p-12'>
            {/* Logo */}
            <h3 className='text-3xl font-bold leading-tight tracking-tighter'>
                Surfle
            </h3>
            {/* Button group */}
            <div className='flex flex-row gap-1'>
                <InfoDialog />
                <UnitsToggle />
            </div>
        </div>
    )
}
