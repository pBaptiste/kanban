"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { ThemeContext } from '@/context/theme-provider'

const ThemeSwitcher = () => {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    return (
        <div className="flex justify-center items-center gap-[23.67px] bg-light-grey dark:bg-very-dark-grey transition duration-500 rounded-md py-[14px]">
            <div>
                <Image src='/assets/icon-light-theme.svg' alt='sun icon' width={19} height={19} />
            </div>
            <button onClick={() => setIsDarkMode(prev => !prev)}
                className={`flex w-[40px] h-[20px] bg-main-purple rounded-xl py-[3px] px-[3px] cursor-pointer ${isDarkMode && 'justify-end'}`}>
                <div className='bg-white rounded-full w-[14px] h-[14px]'></div>
            </button>
            <div>
                <Image src='/assets/icon-dark-theme.svg' alt='moon icon' width={16} height={16} />
            </div>
        </div>
    )
}

export default ThemeSwitcher

