'use client'
import React from 'react'
import { task } from '../helpers/type';
import { useState } from 'react'


type TaskCardProps = Omit<task, 'userId' | 'id'>




const TaskCard: React.FC<TaskCardProps> = ({
    title,
    createdAt,
    status,
    description,
    hours,
    deadline
}) => {

    const getFormatedDate = (date: string) => {

        return date.split(' ').slice(0, 4).join(" ");
    }

    const [titleValue, setTitle] = useState(title);
    const [descriptionValue, setDescription] = useState(description);
    const [isValueEdited, setIsValueEdited] = useState(false)

    const handleTaskEdit = (e: any) => {

        setIsValueEdited(true)
        setTimeout(() => {

            const editValue = e.target.attributes['data-attr-value'].value;

            switch (editValue) {
                case "title":
                    setTitle(e.target.textContent);
                    break;
                case "description":
                    setDescription(e.target.textContent);
                    break;
                    

                default:
                    break;
            }
        }, 200)
    }

    console.log(descriptionValue)



    return (
        <div className='px-4 py-4 rounded-xl shadow-lg'>
            <div className='flex flex-row justify-between items-center gap-4'>
                <div className=''>
                    <h3 className='font-bold text-xl py-1' contentEditable={true} data-attr-value="title"
                        onKeyDown={handleTaskEdit}

                        suppressContentEditableWarning={true}
                    >
                        {title}
                    </h3>
                    <p className='text-gray-400 text-sm font-bold'>
                        {createdAt && getFormatedDate(createdAt)}
                    </p>
                </div>

                <div className='bg-red-400 text-white font-bold py-2 px-4 rounded-2xl text-sm flex items-center justify-center text-center'>
                    {status}
                </div>
            </div>

            <p className=' py-2 italic bg-gray-200 rounded px-2 '
                data-attr-value="description"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onKeyDown={handleTaskEdit}
            >
                {description}
            </p>

            <div className='flex flex-col py-2'>
                <span >

                    <span className='font-bold'>
                        Required Time:{" "}
                    </span>{hours}{" Hours"}
                </span>

                <span>
                    <span className='font-bold'>
                        Deadline:{" "}
                    </span>{deadline && getFormatedDate(deadline)}
                </span>
            </div>

            <div className='flex gap-4'>
                <button>
                    Edit
                </button>

                {
                    isValueEdited && <button>
                        Save
                    </button>
                }
            </div>
        </div>
    )
}


export default TaskCard
