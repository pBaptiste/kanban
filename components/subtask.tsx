"use client"
import React, { useState } from 'react'

type Props = {
    id: string;
    title: string;
    isComplete: boolean;
    updateSubtaskCompletion: (id: string, isComplete: boolean) => void;
}

const Subtask = ({ id, title, isComplete, updateSubtaskCompletion }: Props) => {
    const [isChecked, setIsChecked] = useState(isComplete)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked)
        updateSubtaskCompletion(id, e.target.checked)
    }

    return (
        <div className='pt-[13px] pb-4 pl-3 pr-2 flex items-center gap-4 bg-light-grey dark:bg-very-dark-grey rounded-[4px] hover:bg-main-purple dark:hover:bg-main-purple hover:bg-opacity-25 dark:hover:bg-opacity-25 cursor-pointer transition duration-200'>
            <input name='subtask' type='checkbox' checked={isChecked} onChange={handleChange} className={`appearance-none px-2 py-2 checked:bg-main-purple bg-white dark:bg-dark-grey checked:dark:bg-main-purple border border-[#828FA3] rounded-sm ${isChecked && 'bg-check-icon bg-no-repeat bg-center border-none transition duration-500'} cursor-pointer`} />
            <label htmlFor='subtask' className={`font-bold text-custom-black dark:text-white checked:opacity-50 ${isChecked && 'line-through text-opacity-50 dark:text-opacity-50 transition duration-500'}`}
            >{title}</label>
        </div>
    )
}

export default Subtask