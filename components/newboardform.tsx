"use client"
import React, { useState, useEffect, useRef, useContext } from 'react'
import { motion } from "framer-motion"
import { DataContext } from '@/context/data-provider'
import SubInput from './sub-input'

type Props = {
    setIsBoardFormOpen: (value: boolean) => void;
}

const NewBoardForm = ({ setIsBoardFormOpen }: Props) => {
    const { boardList, setBoardList } = useContext(DataContext)
    const [boardName, setBoardName] = useState('')

    const [columnList, setColumnList] = useState([
        { id: self.crypto.randomUUID(), name: 'Todo', tasks: [] },
        { id: self.crypto.randomUUID(), name: 'Doing', tasks: [] },
    ])

    const addNewColumn = () => {
        setColumnList([...columnList, { id: self.crypto.randomUUID(), name: '', tasks: [] }]);
    };

    const deleteColumn = (id: number) => {
        const newList = columnList.filter((column, index) => index !== id)
        setColumnList(newList)
    }

    const handleColumnChange = (index: number, value: string) => {
        const updatedColumnList = [...columnList];
        updatedColumnList[index].name = value;
        setColumnList(updatedColumnList);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const extractedColumns = columnList

        const newBoard = {
            id: self.crypto.randomUUID(),
            name: boardName,
            columns: extractedColumns,
        }

        const updatedList = boardList;

        updatedList.push(newBoard)

        setBoardList(updatedList)

        setIsBoardFormOpen(false)
    }

    const newBoardMenuRef = useRef<HTMLDivElement | null>(null)

    const handleOutsideClick = (e: MouseEvent) => {
        if (newBoardMenuRef.current && !newBoardMenuRef.current.contains(e.target as Node)) {
            setIsBoardFormOpen(false)
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
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                exit={{ x: 300, opacity: 0 }}
                ref={newBoardMenuRef}>
                <form onSubmit={handleSubmit}
                    className={`px-6 md:px-8 py-6 md:py-8  w-[343px] md:w-[480px] bg-white dark:bg-dark-grey text-custom-black dark:text-white rounded-md`}>
                    <h2 className='font-bold text-[1.125rem] leading-[1.438rem] text-custom-black dark:text-white mb-6'>Add New Board</h2>
                    <div className='flex flex-col gap-2 mb-[33px] pr-[10px]'>
                        <label className='font-bold text-[0.75rem] leading-[0.938rem] text-medium-grey dark:text-white' htmlFor="boardName">Board Name</label>
                        <input placeholder='e.g. Web Design'
                            value={boardName} onChange={(e) => setBoardName(e.target.value)} type="text" name="boardName" id="boardName" className='dark:bg-dark-grey font-normal text-[0.813rem] leading-[1.438rem] text-custom-black dark:text-white placeholder:text-opacity-25 border border-medium-grey border-opacity-25 outline-none hover:border-main-purple focus:border-main-purple transition duration-200 rounded-[4px] px-4 py-2 cursor-pointer' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-bold text-[0.75rem] leading-[0.938rem] text-medium-grey dark:text-white' htmlFor="columns">Board Columns</label>
                        <div className='flex flex-col gap-3 max-h-[200px] overflow-scroll pr-[10px] pb-3'>
                            {columnList.map((column, index) => (
                                <SubInput
                                    value={column.name}
                                    id={index}
                                    key={index}
                                    deleteInput={deleteColumn}
                                    handleInputChange={handleColumnChange} />
                            ))}
                        </div>
                        <button type='button' onClick={addNewColumn}
                            className='bg-main-purple dark:bg-white bg-opacity-10 hover:bg-opacity-25 transition duration-200 rounded-[20px] py-[9px] font-bold text-main-purple text-[0.813rem] leading-[1.438rem] mb-6'>
                            + Add New Column</button>

                        <button type='submit' className='bg-main-purple hover:bg-main-purple-hover transition duration-200 rounded-[20px] py-[9px] font-bold text-white text-[0.813rem] leading-[1.438rem]'>Create Board</button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default NewBoardForm