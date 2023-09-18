'use client'

import { Navbar } from '@/components/navbar/Navbar'
import { Search } from '@/components/search/Search'

const Home = () => {
    return (
        <main className='flex flex-col justify-between min-w-screen-md'>
            <Navbar />
            <Search />
        </main>
    )
}

export default Home
