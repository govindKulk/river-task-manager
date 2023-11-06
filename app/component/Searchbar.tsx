'use client'

import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const Searchbar = ({
    triggerSearch
}: {triggerSearch : (query: string) => void}) => {


    const [query, setQuery] = useState('')
    
    useEffect(() => {

        
        const i = setTimeout(() => {
            triggerSearch(query.toLowerCase())
        }, 500)

        
        return () => clearTimeout(i)
    }, [query])
    
    return (
        <div className='w-2/3 relative'>
            <input type="text" className='py-1 px-4 rounded bg-white text-lg shadow outline-none border border-black w-full' 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='search' />

            <span className='absolute right right-4 top-1/2 -translate-y-1/2'>
                <AiOutlineSearch size={25} />
            </span>
        </div>
    )
}

export default Searchbar
