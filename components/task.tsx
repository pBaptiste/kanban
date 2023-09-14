"use client"
import React, { useState, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import { DataContext } from '@/context/data-provider'
import TaskDetails from './taskdetails'
import EditTaskForm from './edittaskform'
import DeleteTaskForm from './deletetaskform'
import { Tasks } from '@/types/types'

type Props = {
    name: string;
    columnId: string;
    count: number;
    currentTask: Tasks
}

const Task = ({ name, count, currentTask, columnId }: Props) => {
    const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false)
    const [isEditTaskFormOpen, setIsEditTaskFormOpen] = useState(false);
    const [isDeleteTaskFormOpen, setIsDeleteFormOpen] = useState(false);
    const { setActiveColumn } = useContext(DataContext)

    const handleClick = () => {
        setIsTaskDetailsOpen(true)
        setActiveColumn(columnId)

        // setCurrentTaskName(taskName);
    }

    return (
        <div>
            <button onClick={handleClick}
                className='group w-full flex flex-col text-start py-[23px] px-4 bg-white dark:bg-dark-grey transition duration-500 rounded-lg tasks cursor-pointer'>
                <h3 className='text-custom-black dark:text-white font-bold text-[0.938rem] leading-[1.188rem] mb-2 line-clamp-1 group-hover:text-main-purple transition-colors duration-200'>{name}</h3>
                <p className='text-medium-grey font-bold text-xs leading-[0.938rem]'>{count + ' of '} subtasks</p>
            </button>

            <AnimatePresence>
                {isTaskDetailsOpen && <TaskDetails setIsTaskDetailsOpen={setIsTaskDetailsOpen} currentTask={currentTask} setIsEditTaskFormOpen={setIsEditTaskFormOpen} setIsDeleteTaskFormOpen={setIsDeleteFormOpen} />}
            </AnimatePresence>

            <AnimatePresence>
                {isEditTaskFormOpen && <EditTaskForm setIsEditTaskFormOpen={setIsEditTaskFormOpen} currentTask={currentTask} />}
            </AnimatePresence>

            <AnimatePresence>
                {isDeleteTaskFormOpen && <DeleteTaskForm taskName={name} setIsDeleteTaskFormOpen={setIsDeleteFormOpen} />}
            </AnimatePresence>
        </div>
    )
}

export default Task