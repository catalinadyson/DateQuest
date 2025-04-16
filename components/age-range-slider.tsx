"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

interface AgeRangeSliderProps {
  minAge?: number
  maxAge?: number
  onChange?: (values: [number, number]) => void
}

export default function AgeRangeSlider({ minAge = 18, maxAge = 45, onChange }: AgeRangeSliderProps) {
  const [values, setValues] = useState<[number, number]>([minAge, maxAge])

  const handleValueChange = (newValues: number[]) => {
    const typedValues = newValues as [number, number]
    setValues(typedValues)
    onChange?.(typedValues)
  }

  return (
    <div className="w-full px-1">
      <div className="mb-6 relative">
        <Slider
          defaultValue={values}
          min={18}
          max={65}
          step={1}
          value={values}
          onValueChange={handleValueChange}
          className="mt-6"
        />
      </div>
      <div className="flex justify-between">
        <div className="text-center">
          <span className="inline-block px-3 py-1 bg-datequest-teal-500 text-white rounded-full text-sm font-medium">
            {values[0]}
          </span>
        </div>
        <div className="text-center">
          <span className="inline-block px-3 py-1 bg-datequest-teal-500 text-white rounded-full text-sm font-medium">
            {values[1]}
          </span>
        </div>
      </div>
    </div>
  )
}
