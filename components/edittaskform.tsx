"use client"
import React, { useState, useEffect, useContext, useRef } from 'react'
import { motion } from "framer-motion"
import { DataContext } from '@/context/data-provider'
import SubInput from './sub-input'
import Status from './status'
import { Tasks, Subtasks } from '@/types/types'

type Props = {
    setIsEditTaskFormOpen: (value: boolean) => void;
    currentTask: Tasks;
}
const EditTaskForm = ({ setIsEditTaskFormOpen, currentTask }: Props) => {
    const { boardList, setBoardList, activeBoardId, activeBoard, activeColumn } = useContext(DataContext)
    const [currentStatus, setCurrentStatus] = useState(boardList.find(board => board.name === activeBoard)?.columns[0].name || 'Todo')
    const [id, setId] = useState(self.crypto.randomUUID())
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subTaskList, setSubtaskList] = useState<Array<Subtasks>>([]);

    useEffect(() => {
        setId(currentTask.id)
        setTitle(currentTask.title)
        setDescription(currentTask.description)
        setSubtaskList(currentTask.subtasks)
    }, [currentTask])

    const addNewSubtask = () => {
        setSubtaskList([...subTaskList, { id: self.crypto.randomUUID(), title: '', isCompleted: false }]);
    };

    const deleteSubtask = (id: number) => {
        const newList = subTaskList.filter((task, index) => index !== id)
        setSubtaskList(newList)
    }

    const handleSubtaskChange = (index: number, value: string) => {
        const updatedSubtaskList = [...subTaskList];
        updatedSubtaskList[index].title = value;
        setSubtaskList(updatedSubtaskList);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //setIsEditTaskFormOpen(false)

    }

    const editTaskMenuRef = useRef<HTMLDivElement | null>(null)

    const handleOutsideClick = (e: MouseEvent) => {
        if (editTaskMenuRef.current && !editTaskMenuRef.current.contains(e.target as Node)) {
            setIsEditTaskFormOpen(false)
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
                transition={{ delay: 0.25 }}
                ref={editTaskMenuRef}>
                <form
                    onSubmit={handleSubmit}
                    className='px-6 md:px-8 py-6 md:py-8 w-[343px] md:w-[480px] bg-white dark:bg-dark-grey text-custom-black dark:text-white rounded-md'>
                    <h2 className='font-bold text-[1.125rem] leading-[1.438rem] text-custom-black dark:text-white mb-6'>Edit Task</h2>

                    <div className='flex flex-col gap-2 mb-[33px]'>
                        <label className='font-bold text-[0.75rem] leading-[0.938rem] text-medium-grey dark:text-white' htmlFor="title">Title</label>
                        <input placeholder='e.g. Take coffee break'
                            value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" className='dark:bg-dark-grey font-normal text-[0.813rem] leading-[1.438rem] text-custom-black dark:text-white placeholder:text-opacity-25 border border-medium-grey border-opacity-25 outline-none hover:border-main-purple focus:border-main-purple rounded-[4px] px-4 py-2 cursor-pointer' />
                    </div>

                    <div className='flex flex-col gap-2 mb-6'>
                        <label className='font-bold text-[0.75rem] leading-[0.938rem] text-medium-grey dark:text-white' htmlFor="description">Description</label>
                        <textarea placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
                            value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" className='dark:bg-dark-grey font-normal text-[0.813rem] leading-[1.438rem] text-custom-black dark:text-white placeholder:text-opacity-25 border border-medium-grey border-opacity-25 outline-none hover:border-main-purple focus:border-main-purple rounded-[4px] pl-4 pr-[25px] py-2 min-h-[112px] cursor-pointer resize-none'></textarea>
                    </div>

                    {/* overflow-y-auto max-h-[170px] */}
                    <div className='flex flex-col gap-2 mb-6 '>
                        <label className='font-bold text-[0.75rem] leading-[0.938rem] text-medium-grey dark:text-white' htmlFor="subtasks">Subtasks</label>

                        <div className='flex flex-col gap-3 mb-3 pr-[10px] max-h-[100px] overflow-scroll scroll-smooth'>
                            {subTaskList.map((task, index) => (
                                <SubInput
                                    value={task.title}
                                    id={index}
                                    key={index}
                                    deleteInput={deleteSubtask}
                                    handleInputChange={handleSubtaskChange} />
                            ))}
                        </div>
                        <button type='button' onClick={addNewSubtask}
                            className='bg-main-purple dark:bg-white mb-2 bg-opacity-10 hover:bg-opacity-25 rounded-[20px] py-[9px] font-bold text-main-purple text-[0.813rem] leading-[1.438rem]'>
                            + Add New Subtask</button>

                    </div>

                    <div className='flex flex-col mb-6'>
                        <h4 className='font-bold text-[0.75rem] leading-[0.938rem] text-medium-grey dark:text-white mb-2'>Current Status</h4>
                        <Status currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} activeTaskId={id} />
                    </div>

                    <button type='submit' className='bg-main-purple hover:bg-main-purple-hover rounded-[20px] py-[9px] font-bold text-white text-[0.813rem] leading-[1.438rem] w-full'>Create Task</button>
                </form>
            </motion.div>
        </div>
    )
}

export default EditTaskForm