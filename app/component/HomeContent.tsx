'use client'

import React from 'react'

import { useLayoutEffect, useEffect, useState } from 'react'
import Image from 'next/image'
import { ClipLoader } from 'react-spinners';

import useLoginModal from '.././hooks/useLoginModal';
import {useRouter} from 'next/navigation'
import useRegisterModal from '../hooks/useRegisterModal';
import Link from 'next/link';

const HomeContent = ({
    currentUser
}: {currentUser: Record<any, any> | null}) => {


    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  



    {

        return (
            <div className='max-w-screen-lg mx-auto  px-4 min-h-[calc(100vh-76px)] flex items-center justify-center flex-col gap-4 text-white'>
    
                <h1 className='text-4xl w-2/3 text-center '>
                    Be Like a <span className='text-rose-500 text-5xl font-[800]'>River...</span> in Your Works.
                </h1>
    
    
               {!currentUser ?  <div className='flex flex-col items-center justify-center gap-4'>
                <p className='text-4xl pt-4 font-extrabold text-cyan-500 '>
                    Join Now
                </p>
                    <div className='flex gap-2'>
                    <button className='bg-black/30 text-white py-2 px-4 shadow-xl border-white border rounded-lg text-lg font-bold'
                        onClick={() => loginModal.onOpen()}
                    >
                        Login
                    </button>
                    <button className='bg-white text-black py-2 px-4 shadow-xl border-white border rounded-lg text-lg font-bold'
                    onClick={() => registerModal.onOpen()}
                    >
                        Sign Up
                    </button>
                    </div>
                </div> : <Link className='text-cyan-500 font-bold text-xl py-2 px-4 rounded-xl shadow border border-white' href='/tasks'>Go To Workspace</Link>}
            </div>
        )
    }


}

export default HomeContent
