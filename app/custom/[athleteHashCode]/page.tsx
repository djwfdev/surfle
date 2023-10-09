'use client'

import { Navbar } from '@/components/navbar/Navbar'
import { Search } from '@/components/search/Search'

const Home = ({ params }: { params: { athleteHashCode: string } }): JSX.Element => {
    return (
        <main className='flex flex-col justify-between min-w-screen-md'>
            <Navbar />
            <Search athleteHashCode={params.athleteHashCode} />
        </main>
    )
}

export default Home
