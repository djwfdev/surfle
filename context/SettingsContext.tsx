'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface SettingsContextType {
    isMetric: boolean
    toggleUnits(): void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext)
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}

export const SettingsProvider = ({ children }: any) => {
    const [isMetric, setIsMetric] = useState<boolean>(true)

    useEffect(() => {
        const storedSetting = window.sessionStorage.getItem('unitPreference')
        if (storedSetting) {
            setIsMetric(storedSetting === 'metric')
        }
    }, [])

    const toggleUnits = (): void => {
        const newIsMetric = !isMetric
        setIsMetric(newIsMetric)
        window.sessionStorage.setItem('unitPreference', newIsMetric ? 'metric' : 'imperial')
    }

    const contextValue: SettingsContextType = {
        isMetric,
        toggleUnits,
    }

    return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
}
