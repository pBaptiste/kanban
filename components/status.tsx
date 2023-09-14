"use client"
import React, { useState, useEffect, useContext } from 'react'
import { DataContext } from '@/context/data-provider'
import Image from 'next/image'

type Props = {
    currentStatus: string;
    activeTaskId: string
    setCurrentStatus: React.Dispatch<React.SetStateAction<string>>;
    updateStatus?: (status: string) => void;
}
const Status = ({ currentStatus, activeTaskId, setCurrentStatus, updateStatus }: Props) => {
    const { activeBoard, boardList, setBoardList, activeColumn } = useContext(DataContext)
    const [isStatusOpen, setIsStatusOpen] = useState(false)
    const [currentBoard, setCurrentBoard] = useState(boardList.find(board => board.name === activeBoard))

    useEffect(() => {
        setCurrentBoard(boardList.find(board => board.name === activeBoard))

    }, [boardList, activeBoard])

    const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        setCurrentStatus(e.currentTarget.innerText)

        updateStatus && updateStatus(e.currentTarget.innerText)

        const updatedList = boardList

        const targetBoardIndex = updatedList.findIndex(board => board.id === activeBoard);

        if (targetBoardIndex !== -1) {
            console.log("Target Board Index" + targetBoardIndex)
            //Find the target column index
            const targetColumnIndex = updatedList[targetBoardIndex].columns.findIndex(column => column.id === activeColumn)

            if (targetColumnIndex !== -1) {
                console.log("Target Column Index" + targetColumnIndex)
                const targetTaskIndex = updatedList[targetBoardIndex].columns[targetColumnIndex].tasks?.findIndex(task => task.id === activeTaskId)

                if (targetTaskIndex !== -1) {
                    console.log("Target Task Index " + targetTaskIndex)
                    // Move the task to the new column
                    const taskToMove = updatedList[targetBoardIndex].columns[targetColumnIndex].tasks.splice(targetTaskIndex, 1)[0];
                    const newColumnIndex = updatedList[targetBoardIndex].columns.findIndex(column => column.name === e.currentTarget.innerText)

                    if (newColumnIndex !== -1) {
                        console.log("New Target Column " + newColumnIndex)
                        updatedList[targetBoardIndex].columns[newColumnIndex].tasks.push(taskToMove);
                    }
                }
            }
        }

        setBoardList(updatedList)

        setIsStatusOpen(false)

    }

    return (
        <div onClick={() => setIsStatusOpen((prev) => !prev)}
            className='relative border border-medium-grey border-opacity-25 hover:border-main-purple hover:border-opacity-100 rounded px-4 py-2 flex justify-between items-center text-normal text-[0.813rem] leading-[1.438rem] text-custom-black dark:text-white cursor-pointer'>
            {currentStatus}
            {!isStatusOpen ?
                <Image src='/assets/icon-chevron-down.svg' alt='mobile logo' width={10} height={7} />
                :
                <Image src='/assets/icon-chevron-up.svg' alt='mobile logo' width={10} height={7} />
            }
            {isStatusOpen &&
                <div className='absolute top-[40px] left-0  bg-white dark:bg-very-dark-grey w-full rounded-lg p-4 mobile-board flex flex-col gap-2'>
                    {currentBoard?.columns?.map(column => (
                        <p key={column.id} onClick={handleClick} className='font-normal text-medium-grey text-[0.813rem] leading-[1.438rem] capitalize hover:text-main-purple'>{column.name}</p>
                    ))}
                    {/* <p onClick={handleClick} className='font-normal text-medium-grey text-[0.813rem] leading-[1.438rem] capitalize hover:text-main-purple'>Todo</p>
                    <p onClick={handleClick} className='font-normal text-medium-grey text-[0.813rem] leading-[1.438rem] capitalize hover:text-main-purple'>Doing</p>
                    <p onClick={handleClick} className='font-normal text-medium-grey text-[0.813rem] leading-[1.438rem] capitalize hover:text-main-purple'>Done</p> */}

                </div>
            }
        </div>
    )
}

export default Status