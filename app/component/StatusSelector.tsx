"use client"

import Select from 'react-select'

import React from 'react'

export type TaskStatusValue = {
    status: 'Completed' | 'Pending' | 'Cancelled'
}


interface CountrySelectProps {
    value?: TaskStatusValue;
    onChange: (value: TaskStatusValue) => void
}
const StatusSelector: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {

    const options = [
        {
            value: 'completed',
            label: 'Complete'
        },
        {
            value: 'pending',
            label: "Pending"
        },
        {
            value: "cancelled",
            label: "Cancel"
        }
    ]

    return (
        <div>
             <Select
        placeholder="Task Status"
        isClearable
        options={options}
        value={value}
        onChange={(value) => onChange(value as TaskStatusValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
      
            <div>
              {option.label}
              
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'brown',
            primary25: 'coral'
          }
        })}
      />

        </div>
    )
}

export default StatusSelector