import { SettingsProvider } from '@/context/SettingsContext'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Surfle',
    description: 'The surfing themed wordle game',
}

const RootLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Toaster richColors />
                <SettingsProvider>
                    {children}
                </SettingsProvider>
            </body>
        </html>
    )
}

export default RootLayout
