'use client'

import React, { useEffect, useState } from 'react'
import TaskCard from '../component/TaskCard';
import { task } from '../helpers/type';

const TasksPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<task[]>([])

    useEffect(() => {

        fetch('/api/tasks')
            .then((res) => res.json())
            .then(data => setData(data.tasks))
            .catch(err => console.log(err));



    }, [])


    return (<div className='grid grid-cols-3 gap-4 max-w-screen-lg mx-auto  px-4'>
            {
                data.map((task, i) => <TaskCard
                key={i}
                title={task.title} description={task.description} 
                status={task.status}
                deadline={task.deadline}
                />
                )
            }
        </div> 
    )
    
}

export default TasksPage
