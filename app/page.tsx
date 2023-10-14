'use client'

import { Navbar } from '@/components/navbar/Navbar'
import { Search } from '@/components/search/Search'

const Home = () => {
    return (
        <main className='min-w-[460px]'>
            <Navbar />
            <Search />
        </main>
    )
}

export default Home
