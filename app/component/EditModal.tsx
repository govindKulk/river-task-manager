'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import useLoginModal from '../hooks/useLoginModal'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import useEditModal from '../hooks/useEditModal'
import Input from './Input'
import Select from 'react-select'
import StatusSelector, { TaskStatusValue } from './StatusSelector'
import LoginModal from './LoginModal'
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css';


const EditModal = ({
    currentUser
}: { currentUser?: Record<any, any> | null }) => {

    const [isLoading, setIsLoading] = useState(false)

    const [statusValue, setStatusValue] = useState<TaskStatusValue>()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState<Date>(new Date())
    const [hours, setHours] = useState('')

    const editModal = useEditModal();




    const onSubmit = async () => {

        if (!title || !description || !statusValue) {
            return
        }
        console.log({
            statusValue,
            title,
            description,
            deadline
        })

        setTimeout(() => {
            editModal.onClose();
        }, 1000)
    }





    const bodyContent = <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
            <label htmlFor="title" className='font-bold text-xl'>
                Title
            </label>

            <input
                className='border border-neutral-300 py-4 text-lg px-4 rounded-lg'
                placeholder='Task title'
                id="title"
                type="text"
                disabled={isLoading}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="description" className='font-bold text-xl'>
                Description
            </label>

            <input
                className='border border-neutral-300 py-4 text-lg px-4 rounded-lg'
                placeholder='Task Description'
                id="description"
                type="text"
                disabled={isLoading}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="description" className='font-bold text-xl'>
                Hours To Complete
            </label>

            <input
                className='border border-neutral-300 py-4 text-lg px-4 rounded-lg'
                placeholder='Task Duration'
                id="hours"
                type="number"
                disabled={isLoading}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
            />

        </div>

        

        <div>
            <p className='text-xl font-bold py-2'>Select Deadline</p>

            <div className='flex justify-center py-2'>
            <Calendar value={deadline} onChange={(value) => setDeadline(value as Date)} />
        </div>

        <div>
            <StatusSelector
                value={statusValue}
                onChange={(value) => setStatusValue(value as TaskStatusValue)}
            />
        </div>
        </div>
    </div>


    if (!currentUser?.name) {
        return
    }
    return (

        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Add a Task"
            actionLabel="Add"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
       
        />

    )
}

export default EditModal
