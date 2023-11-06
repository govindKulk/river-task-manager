'use client'

import React, { useEffect, useState } from 'react'
import TaskCard from '../component/TaskCard';
import { task } from '../helpers/type';
import { User } from '@prisma/client';

import useEditModal from '../hooks/useEditModal';
import { IoMdAddCircle } from 'react-icons/io';
import useMutator from '../hooks/useMutator';
import Searchbar from './Searchbar';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';

const TaskPageContent = ({
    currentUser
}: {currentUser: User | null}) => {


    const globalMutator = useMutator()

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<task[]>([])

    const [filteredData, setFilteredData] = useState<task[]>(data)

    const editModal = useEditModal();

    const [isChanged, setIsChanged] = useState(false)


    useEffect(() => {


      fetchMutatedTasks();



    }, [isChanged])

    useEffect(() => {
        setFilteredData(data)
    }, [data])

    const fetchMutatedTasks = () => {
        setIsLoading(true)
        fetch('/api/tasks')
            .then((res) => res.json())
            .then(data => {
                setData(data.tasks)
                setIsLoading(false)
            })
            .catch(err => console.log(err));

    }

    if(globalMutator.shouldMutate){
        fetchMutatedTasks();
        globalMutator.noMutate();
    }

    const handleSearch = (query: string) => {
        const newData = data.filter((task, i ) => task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query));

        setFilteredData(newData)
        
    
    }


    

    if(!currentUser){
       return (
        <div className='h-[calc(100vh-76px)] flex flex-col items-center justify-center'>
                    <h1 className='text-4xl font-bold'>
                        You dont have any account.
                    </h1>
                    <Link href="/" className='text-rose-500 font-bold text-3xl'>Login Now</Link>
                </div>
       )
    }

    if(data.length === 0){
        return(
            <div className='flex items-center justify-center h-[calc(100vh-76px)]'>
                {
                    isLoading ? <ClipLoader size={300} /> : 
                    <div className='h-[calc(100vh-76px)] flex flex-col items-center justify-center'>
                    <h1 className='text-4xl font-bold'>
                        You dont have any tasks.
                    </h1>
                    <h2 className='text-rose-500 font-bold text-3xl'>
                        Add Now
    
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
                    </h2>
                </div>
                }
            </div>
        )
    }

    return (<div className='max-w-screen-lg mx-auto'>

        <div className='py-2 flex justify-center'>
            <Searchbar triggerSearch={handleSearch}/>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4   px-4'>
            {
                filteredData.map((task, i) => <TaskCard
                key={i}
                title={task.title} description={task.description} 
                status={task.status}
                deadline={task.deadline}
                id={task.id}
                mutateTasks={fetchMutatedTasks}
                />
                )
            }
        </div> 
    </div>
    )
    
}

export default TaskPageContent
