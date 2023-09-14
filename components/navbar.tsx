"use client"
import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DataContext } from '@/context/data-provider'
import Image from 'next/image'
import MobileMenu from './mobile-menu'
import NewTaskForm from './newtaskform'
import EditBoardForm from './editboardform'
import DeleteBoardForm from './deleteboardform'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false)
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
    const [isEditBoardFormOpen, setIsEditBoardFormOpen] = useState(false)
    const [isDeleteBoardFormOpen, setIsDeleteBoardFormOpen] = useState(false)
    const { activeBoard } = useContext(DataContext)

    const handleEditBoard = () => {
        setIsEditBoardFormOpen((prev) => true)
        setIsEditMenuOpen((prev) => false)
    }

    const handleDeleteBoard = () => {
        setIsDeleteBoardFormOpen((prev) => true)
        setIsEditMenuOpen((prev) => false)
    }

    return (
        <header>
            <nav className='relative flex items-center justify-between bg-white dark:bg-dark-grey transition duration-500 px-4 py-[20px] md:px-6 md:py-7 lg:pt-[29px] lg:pb-[37px]'>
                {/* Mobile Logo & Mobile Menu Toggle */}
                <div className='flex items-center gap-4'>
                    <Image src='/assets/logo-mobile.svg' alt='mobile logo' width={24} height={25} className='md:hidden' />
                    <button
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        className='flex gap-2 items-center font-bold text-[1.125rem] leading-[1.438rem] md:text-[1.25rem] md:leading-[1.563rem] lg:text-2xl lg:leading-[1.875rem] text-custom-black dark:text-white'>
                        {activeBoard}
                        <div className='md:hidden'>
                            {!isMobileMenuOpen
                                ?
                                <Image src='/assets/icon-chevron-down.svg' alt='mobile logo' width={10} height={7} />
                                :
                                <Image src='/assets/icon-chevron-up.svg' alt='mobile logo' width={10} height={7} />
                            }
                        </div>
                    </button>
                </div>

                {/* New Task button & Task Edit/Delete Menu */}
                <div className='flex gap-4 md:gap-6 items-center'>
                    <button onClick={() => setIsTaskFormOpen((prev) => true)}
                        className='bg-main-purple hover:bg-main-purple-hover px-[18px] py-[10px] md:px-6 md:py-[0.938rem] rounded-3xl text-white font-bold text-[0.938rem] leading-[1.188rem] transition duration-300'>
                        <Image src='/assets/icon-add-task-mobile.svg' alt='cross icon' className='md:hidden' width={12} height={12} />
                        <p className='hidden md:block'>+ Add New Task</p>
                    </button>

                    <button onClick={() => setIsEditMenuOpen((prev) => !prev)}>
                        <Image src='/assets/icon-vertical-ellipsis.svg' alt='chevron icon' width={5} height={20} />
                    </button>

                    <AnimatePresence>
                        {isEditMenuOpen && (
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                className={`absolute top-[90px] right-[25px] bg-white dark:bg-very-dark-grey rounded-lg mobile-board py-4 pl-4 flex flex-col items-start gap-4 w-[192px]`}>
                                <button
                                    onClick={handleEditBoard}
                                    className='font-medium text-[0.813rem] leading-[1.438rem] text-medium-grey'>Edit Board</button>
                                <button
                                    onClick={handleDeleteBoard}
                                    className='font-medium text-[0.813rem] leading-[1.438rem] text-custom-red'>Delete Board</button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />}
            </AnimatePresence>

            <AnimatePresence>
                {isTaskFormOpen && <NewTaskForm setIsTaskFormOpen={setIsTaskFormOpen} />}
            </AnimatePresence>

            <AnimatePresence>
                {isEditBoardFormOpen && <EditBoardForm setIsEditBoardFormOpen={setIsEditBoardFormOpen} />}
            </AnimatePresence>

            <AnimatePresence>
                {isDeleteBoardFormOpen && <DeleteBoardForm setIsDeleteBoardFormOpen={setIsDeleteBoardFormOpen} />}
            </AnimatePresence>

        </header>
    )
}

export default Navbar