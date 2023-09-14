import React, { Dispatch, SetStateAction, useEffect, useRef, useContext } from 'react'
import { DataContext } from '@/context/data-provider'
import ThemeSwitcher from './theme-switcher'

type Props = {
    setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>
}

const MobileMenu = ({ setIsMobileMenuOpen }: Props) => {
    const { activeBoard, setActiveBoard, setActiveBoardId, boardList } = useContext(DataContext)

    const handleClick = (e: any) => {
        setActiveBoard(e.target.innerText)
        setActiveBoardId(e.target.id)
        if (e.target === document.body) {
            setIsMobileMenuOpen(false)
        }
    }

    const mobileMenuRef = useRef<HTMLDivElement | null>(null)


    const handleOutsideClick = (e: MouseEvent) => {
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
            setIsMobileMenuOpen(false);
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
        <div className='md:hidden fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 flex items-start justify-center'>
            <div ref={mobileMenuRef} className="bg-white dark:bg-dark-grey rounded-lg py-4 pr-6 mobile-board w-[264px] mt-20">
                <h3 className="font-bold text-xs leading-[0.938rem] tracking-[2.4px] uppercase text-medium-grey ml-6 mb-[19px]">
                    All Boards ({boardList.length})
                </h3>

                <ul className="flex flex-col gap-2">
                    {boardList.map(board => (
                        <li key={board.id}>
                            <button
                                onClick={handleClick}
                                className={`group flex gap-3 items-center font-bold text-[0.938rem] leading-[1.188rem] w-full py-[0.938rem] pl-6 hover:bg-main-purple hover:bg-opacity-10 hover:text-main-purple dark:hover:bg-white rounded-r-[100px] ${activeBoard === board.name ? 'bg-main-purple text-white' : 'text-medium-grey'} transition duration-300`}>

                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className={`group-hover:fill-main-purple ${activeBoard === board.name ? 'fill-[#fff]' : 'fill-[#828FA3]'} transition duration-300`}>
                                    <path
                                        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                                </svg>

                                {board.name}</button>
                        </li>
                    ))}

                    <li>
                        <button
                            className="flex gap-3 items-center font-bold text-[0.938rem] leading-[1.188rem] text-main-purple pl-6 py-[0.938rem]">
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="fill-[#635FC7]">
                                <path
                                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                            </svg>
                            + Create New Board</button>
                    </li>
                </ul>

                <div className="ml-4">
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    )
}

export default MobileMenu