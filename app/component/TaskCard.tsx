'use client'
import React from 'react'
import { task } from '../helpers/type';
import { useState } from 'react'
import Select from'react-select'
import { useRouter } from 'next/navigation';
import { BsTrash } from 'react-icons/bs';
import { FaRegSave } from 'react-icons/fa';
import useMutator from '../hooks/useMutator';

type TaskProps = Omit<task, 'userId'>

interface TaskCardProps extends TaskProps {
    mutateTasks: () => void
}




const TaskCard: React.FC<TaskCardProps> = ({
    title,
    createdAt,
    status,
    description,
    hours,
    deadline,
    id,
    mutateTasks
}) => {

    const getFormatedDate = (date: string) => {

        return date.split(' ').slice(0, 4).join(" ");
    }

    const [titleValue, setTitle] = useState(title);
    const [descriptionValue, setDescription] = useState(description);
    const [isValueEdited, setIsValueEdited] = useState(false)
    const [statusClicked, setStatusClicked] = useState(false)

    const [defaultStatus, setDefaultStatus] = useState(status)

    const globalMutator = useMutator();

    const router = useRouter();
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


    const onSave =  () => {
        

        const quickUpdatedTask = JSON.stringify({
            title: titleValue,
            description:
            descriptionValue,
            status: defaultStatus
        })

        fetch(`/api/tasks/${id}`, {
            method: 'POST',
            body: quickUpdatedTask,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            setStatusClicked(false);
            setIsValueEdited(false)
            router.refresh();
            globalMutator.yesMutate();
        })
    }


    const onDelete = () => {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            
        }).then(res => res.json()).then(data => {
            console.log(data);
            setStatusClicked(false);
            setIsValueEdited(false)
            router.refresh();
            globalMutator.yesMutate();
        })
    }
    const options = [{value: 'completed', label: 'Complete'}, {value: 'cancelled', label: 'Cancel'} , {value: 'pending', label: 'Pending'}].filter((option) => option.value !== defaultStatus)

 
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

                <div className='text-black font-bold py-2 px-4 rounded-2xl text-sm flex items-center justify-center text-center
                cursor-pointer
                gap-4
                '
               
                >

                    <div
                     onClick={() => setStatusClicked(true)}
                    >
                    {!statusClicked ? status : 
                    <Select
                    options={options}

                    onChange={(value) => setDefaultStatus(value?.value as typeof status)}
                    classNames={{
                        control: () => 'py-1 border-2',
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
                    />}
                    </div>

                    

                    <span 
                    onClick={onDelete}
                    className='text-red-700'>
                        <BsTrash size={20}/>
                    </span>


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
                

                {
                    (isValueEdited || statusClicked) && <button
                    className=' bg-amber-600 font-bold flex gap-2 justify-center p-2 rounded-xl shadow-lg items-center text-white text-sm'
                    onClick={() => onSave()}>
                        <span>
                            <FaRegSave size={20}/>
                        </span>
                        Save
                    </button>
                }
            </div>
        </div>
    )
}


export default TaskCard
