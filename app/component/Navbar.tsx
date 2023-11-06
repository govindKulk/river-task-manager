'use client'

import React, { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { IoMdExit } from 'react-icons/io'

import { signOut } from 'next-auth/react'
import useEditModal from '../hooks/useEditModal'
import Searchbar from './Searchbar'
import { FaHamburger } from 'react-icons/fa'


const Navbar = ({
    name
}: { name?: string | null }) => {

    const editModal = useEditModal();
    const [showNav, setShowNav] = useState(false)
    return (
        <nav className='py-4 px-4 text-lg  bg-slate-600 w-full '>

            <div className='flex items-center justify-between max-w-screen-lg mx-auto' >
                <div className='relative flex items-center gap-4'>

                    <span className='text-rose-500 text-5xl font-[800]'>River...</span>

            
                </div>

                <div className={`hidden md:flex gap-4 items-center `}>
                    {name && <div className='text-red-700 bg-red-200 rounded-lg shadow-xl flex items-center 
                    border-2 border-red-300 justify-center h-full px-2 cursor-pointer '
                    onClick={() => editModal.onOpen()}
                    >

                        <span className='font-bold' 
                       
                        >
                            Add
                        </span>
                        <IoMdAddCircle size={40} />
                    </div>}

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

                <div className='md:hidden'>
                    <span className='text-white cursor-pointer' onClick={(e) =>{
                        e.stopPropagation();
                        setShowNav(true)}}>
                        <AiOutlineMenu size={40}/>
                    </span>
                </div>
 
                <div className={`${showNav ? ' absolute bg-black text-white inset-0 flex  flex-col gap-4 items-center justify-center' : "hidden"}`}>

                    
                <span className='absolute left-4 top-4 cursor-pointer' onClick={() => setShowNav(false)}>
                          <AiOutlineClose size={40}/>
                      </span>
                {name && <div className='text-red-700 bg-red-200 rounded-lg shadow-xl flex items-center 
                    border-2 border-red-300 justify-center md:h-full px-2 cursor-pointer '
                    onClick={() => editModal.onOpen()}
                    >

                        <span className='font-bold' 
                       
                        >
                            Add
                        </span>
                        <IoMdAddCircle size={40} />
                    </div>}


                    {

                    
                        name && <div className='flex flex-col gap-2 items-center text-white'>
                            <div className='text-white font-bold flex flex-col items-center'>

                                <span>
                                    <BsPerson size={30} />
                                </span>
                                <span>
                                    {name}
                                </span>

                            </div>

                            <span
                            className='cursor-pointer flex flex-row gap-4'
                            onClick={() => signOut()}>
                                Logout
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
