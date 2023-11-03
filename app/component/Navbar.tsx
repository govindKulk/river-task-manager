'use client'

import React from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { IoMdExit } from 'react-icons/io'

import { signOut } from 'next-auth/react'
import useEditModal from '../hooks/useEditModal'


const Navbar = ({
    name
}: { name?: string | null }) => {

    const editModal = useEditModal()
    return (
        <nav className='py-4 px-4 text-lg  bg-slate-600 w-full '>

            <div className='flex items-center justify-between max-w-screen-lg mx-auto'>
                <div className='relative flex items-center gap-4'>

                    <span className='text-rose-500 text-5xl font-[800]'>River...</span>

                    <input type="text" className='py-1 px-4 rounded bg-white text-lg shadow outline-none' placeholder='search' />

                    <span className='absolute right right-4 top-1/2 -translate-y-1/2'>
                        <AiOutlineSearch size={25} />
                    </span>
                </div>

                <div className='flex gap-4 items-center'>
                    <div className='text-red-700 bg-red-200 rounded-lg shadow-xl flex items-center 
                    border-2 border-red-300 justify-center h-full px-2 cursor-pointer '
                    onClick={() => editModal.onOpen()}
                    >

                        <span className='font-bold' 
                       
                        >
                            Add
                        </span>
                        <IoMdAddCircle size={40} />
                    </div>

                    {
                        name && <div className='flex flex-row gap-2 items-center text-white'>
                            <div className='text-white font-bold flex flex-col items-center'>

                                <span>
                                    <BsPerson size={30} />
                                </span>
                                <span>
                                    {name}
                                </span>

                            </div>

                            <span
                            className='cursor-pointer'
                            onClick={() => signOut()}>
                                <IoMdExit size={30} />
                            </span>
                        </div>
                    }
                </div>
            </div>

        </nav>
    )
}

export default Navbar
