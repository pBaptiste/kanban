"use client"
import React, { useContext, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import ThemeSwitcher from './theme-switcher'
import Image from 'next/image'
import { ThemeContext } from '@/context/theme-provider'
import { DataContext } from '@/context/data-provider'
import NewBoardForm from './newboardform'

type Props = {
    closeSideBarMenu: () => void;
}

const SidebarMenu = ({ closeSideBarMenu }: Props) => {
    const { isDarkMode } = useContext(ThemeContext)
    const { activeBoard, setActiveBoard, setActiveBoardId, boardList, setActiveColumn } = useContext(DataContext)
    const [isBoardFormOpen, setIsBoardFormOpen] = useState(false)


    const handleClick = (e: any) => {
        setActiveBoard(e.target.innerText)
        setActiveBoardId(e.target.id)
        //setActiveColumn()
    }

    return (
        <div className="relative z-20 pt-[38px] pb-8 bg-white dark:bg-dark-grey transition duration-500 w-[261px] lg:w-[300px] h-full flex flex-col flex-none justify-between border-r border-r-lines-light dark:border-lines-dark">
            <div>
                <div className="ml-[26px] mb-[54px]">
                    {isDarkMode
                        ? <Image src='/assets/logo-light.svg' alt='light theme logo' width={152.53} height={25.22} />
                        : <Image src='/assets/logo-dark.svg' alt='dark theme logo' width={152.53} height={25.22} />
                    }
                </div>

                <h3 className="font-bold text-xs leading-[0.938rem] tracking-[2.4px] uppercase text-medium-grey ml-6 mb-[19px]">
                    All Boards ({boardList.length})
                </h3>

                <ul className="flex flex-col pr-5 ">
                    {boardList.map(board => (
                        <li key={board.id}>
                            <button onClick={handleClick}

                                className={`group flex gap-3 items-center font-bold text-[0.938rem] leading-[1.188rem] w-full py-[0.938rem] pl-6 lg:pl-8 hover:bg-main-purple hover:bg-opacity-10 hover:text-main-purple dark:hover:bg-white rounded-r-[100px] ${activeBoard === board.name ? 'bg-main-purple text-white' : 'text-medium-grey'} transition duration-00`}>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className={`group-hover:fill-main-purple ${activeBoard === board.name ? 'fill-[#fff]' : 'fill-[#828FA3]'} transition duration-200`}>
                                    <path
                                        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                                </svg>
                                {board.name}</button>
                        </li>
                    ))}

                    <li>
                        <button onClick={() => setIsBoardFormOpen(true)}
                            className="flex gap-3 items-center font-bold text-[0.938rem] leading-[1.188rem] text-main-purple pl-6 lg:pl-8 py-[0.938rem]">
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="fill-[#635FC7]">
                                <path
                                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                            </svg> + Create New Board
                        </button>
                    </li>
                </ul>
            </div>

            <div>
                <div className="px-[13px] lg:px-6 mb-2">
                    <ThemeSwitcher />
                </div>

                <div className="pr-6">
                    <button onClick={() => closeSideBarMenu()}

                        className="group flex gap-[10px] items-center font-bold text-[0.938rem] leading-[1.188rem] text-medium-grey w-full pl-6 lg:pl-[31px] py-[15px] hover:bg-main-purple hover:bg-opacity-10 dark:hover:bg-white hover:text-main-purple hover:rounded-r-[100px]">
                        <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg" className="fill-[#828FA3] group-hover:fill-main-purple">
                            <path
                                d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" />
                        </svg> Hide Sidebar
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {isBoardFormOpen && <NewBoardForm setIsBoardFormOpen={setIsBoardFormOpen} />}
            </AnimatePresence>


        </div>
    )
}

export default SidebarMenu