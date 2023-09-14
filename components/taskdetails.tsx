"use client"
import React, { useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { DataContext } from '@/context/data-provider'
import Image from 'next/image'
import { Tasks } from '@/types/types'
import Subtask from './subtask'
import Status from './status'

type Props = {
    setIsTaskDetailsOpen: (value: boolean) => void;
    setIsEditTaskFormOpen: (value: boolean) => void;
    setIsDeleteTaskFormOpen: (value: boolean) => void;
    currentTask: Tasks
}

const TaskDetails = ({ setIsTaskDetailsOpen, setIsEditTaskFormOpen, setIsDeleteTaskFormOpen, currentTask }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(currentTask.status || 'Todo')
    const { boardList, setBoardList, activeBoard, activeColumn } = useContext(DataContext)
    const boardIndex = boardList.findIndex((board) => board.name === activeBoard)
    const columnIndex = boardList[boardIndex].columns.findIndex((column) => column.id === activeColumn)
    const taskIndex = boardList[boardIndex].columns[columnIndex].tasks.findIndex((task) => task.id === currentTask.id)



    const handleEdit = () => {
        setIsEditTaskFormOpen(true)
        setIsTaskDetailsOpen(false)
    }

    const handleDelete = () => {
        setIsTaskDetailsOpen(false)
        setIsDeleteTaskFormOpen(true)
    }

    const updateStatus = (status: string) => {
        let updatedBoardList = [...boardList]
        updatedBoardList[boardIndex].columns[columnIndex].tasks[taskIndex].status = status
        setBoardList(updatedBoardList)
    }

    const updateSubtaskCompletion = (id: string, completed: boolean) => {
        const subTaskIndex = boardList[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks.findIndex((subTask) => subTask.id === id)
        let updatedBoardList = [...boardList]
        updatedBoardList[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[subTaskIndex].isCompleted = completed

        setBoardList(updatedBoardList)
    }

    const detailsMenuRef = useRef<HTMLDivElement | null>(null)

    const handleOutsideClick = (e: MouseEvent) => {
        if (detailsMenuRef.current && !detailsMenuRef.current.contains(e.target as Node)) {
            setIsTaskDetailsOpen(false)
        }
    };

    useEffect(() => {
        // Add a click event listener to the document to handle outside clicks
        document.addEventListener('click', handleOutsideClick);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    },); // Empty dependency array to run the effect only once

    return (
        <div className='fixed w-full min-h-full top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-30'>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}

                ref={detailsMenuRef} className='px-6 md:px-8 pt-6 pb-8 md:py-8 w-[343px] md:w-[480px] bg-white dark:bg-dark-grey text-custom-black dark:text-white rounded-md'>
                <div className='relative flex justify-between items-center mb-6'>
                    <h3 className='font-bold text-[1.125rem] leading-[1.438rem] basis-[90%]'>{currentTask.title}</h3>
                    <button onClick={() => setIsMenuOpen((prev) => !prev)}>
                        <Image src='/assets/icon-vertical-ellipsis.svg' alt='ellipsis' width={5} height={20} />
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                className={`absolute top-[40px] right-[-80px] bg-white dark:bg-very-dark-grey rounded-lg mobile-board py-4 pl-4 flex flex-col items-start gap-4 w-[192px]`}>
                                <button onClick={handleEdit}
                                    className='font-medium text-[0.813rem] leading-[1.438rem] text-medium-grey'>Edit Task</button>
                                <button onClick={handleDelete}
                                    className='font-medium text-[0.813rem] leading-[1.438rem] text-custom-red'>Delete Task</button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                <p className='font-medium text-[0.813rem] leading-[1.438rem] text-medium-grey mb-6'>{currentTask.description}</p>

                <div>
                    <h4 className='font-bold text-[0.75rem] leading-[0.938rem] text-medium-grey dark:text-white mb-4'>Subtasks ( )</h4>
                    <div className='flex flex-col gap-2 mb-6 max-h-[300px] overflow-scroll'>
                        {
                            currentTask.subtasks && currentTask.subtasks.map(subtask => (
                                <Subtask key={subtask.id} title={subtask.title} isComplete={subtask.isCompleted} updateSubtaskCompletion={updateSubtaskCompletion} id={subtask.id} />
                            ))
                        }
                    </div>
                </div>

                <div>
                    <h4 className='font-bold text-[0.75rem] leading-[0.938rem] text-medium-grey dark:text-white mb-2'>Current Status</h4>
                    <Status currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} updateStatus={updateStatus} activeTaskId={currentTask.id} />
                </div>
            </motion.div>
        </div>
    )
}

export default TaskDetails