"use client"
import React, { useContext, useRef, useEffect } from 'react'
import { motion } from "framer-motion"
import { DataContext } from '@/context/data-provider'

type Props = {
    setIsDeleteBoardFormOpen: (value: boolean) => void;
}
const DeleteBoardForm = ({ setIsDeleteBoardFormOpen }: Props) => {
    const { activeBoard } = useContext(DataContext)
    const deleteBoardMenuRef = useRef<HTMLDivElement | null>(null)

    const handleOutsideClick = (e: MouseEvent) => {
        if (deleteBoardMenuRef.current && !deleteBoardMenuRef.current.contains(e.target as Node)) {
            setIsDeleteBoardFormOpen(false)
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsDeleteBoardFormOpen(false)
    }

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
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                exit={{ x: -300, opacity: 0 }}
                ref={deleteBoardMenuRef}>
                <form onSubmit={handleSubmit}
                    className='w-[343px] md:w-[480px] bg-white dark:bg-dark-grey rounded-md p-6 md:p-8 flex flex-col gap-6'>
                    <h3 className='font-bold text-[1.125rem] leading-[1.438rem] text-custom-red'>Delete this board?</h3>
                    <p className='font-medium text-[0.813rem] leading-[1.438rem] text-medium-grey'>Are you sure you want to delete the ‘{activeBoard}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                    <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
                        <button type='submit'
                            className='md:basis-1/2 bg-custom-red hover:bg-custom-red-hover transition duration-300 rounded-[20px] py-2 font-bold text-[0.813rem] leading-[1.438rem] text-white'>Delete</button>
                        <button onClick={handleCancel}
                            className='md:basis-1/2 bg-main-purple bg-opacity-10 dark:bg-white transition duration-300 rounded-[20px] py-2 font-bold text-[0.813rem] leading-[1.438rem] text-main-purple hover:bg-opacity-25'>Cancel</button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default DeleteBoardForm