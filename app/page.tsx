'use client'

import { Navbar } from '@/components/navbar/Navbar'
import { Search } from '@/components/search/Search'

const Home = () => {
    return (
        <main className='min-w-[320px] mx-auto'>
            <Navbar />
            <Search />
        </main>
    )
}

export default Home
