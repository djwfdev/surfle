import React from 'react'
import { InfoDialog } from './InfoDialog';

export const Navbar = (): JSX.Element => {
    return (
        <div className='flex justify-between p-12'>
            {/* Logo */}
            <h3 className='text-3xl font-bold leading-tight tracking-tighter'>
                Surfle
            </h3>
            {/* Button group */}
            <div>
                <InfoDialog />
            </div>
        </div>
    )
}
