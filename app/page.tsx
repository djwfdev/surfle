'use client'

import { Navbar } from '@/components/navbar/Navbar'
import { Search } from '@/components/search/Search'
import { SettingsProvider } from '@/context/SettingsContext'

const Home = () => {
    return (
        <SettingsProvider>
            <main className='flex flex-col justify-between min-w-screen-md'>
                <Navbar />
                <Search />
            </main>
        </SettingsProvider>
    )
}

export default Home
