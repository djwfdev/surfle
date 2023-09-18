import { SettingsProvider } from '@/context/SettingsContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Surfle',
    description: 'The pro-surfer guessing game',
}

const RootLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SettingsProvider>
                    {children}
                </SettingsProvider>
            </body>
        </html>
    )
}

export default RootLayout
