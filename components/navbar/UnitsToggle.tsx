import React from 'react'
import { Toggle } from '../ui/toggle'
import { useSettings } from '@/context/SettingsContext'

export const UnitsToggle = (): JSX.Element => {
    const { isMetric, toggleUnits } = useSettings()

    return (
        <div className='flex flex-row gap-1'>
            <Toggle
                aria-label='Metric'
                pressed={isMetric}
                onPressedChange={() => toggleUnits()}
            >
                metric
            </Toggle>
            <Toggle
                aria-label='Imperial'
                pressed={!isMetric}
                onPressedChange={() => toggleUnits()}
            >
                freedom
            </Toggle>
        </div>
    )
}
