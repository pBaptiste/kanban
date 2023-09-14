import React from 'react'

type Props = {
    value: string;
    id: number;
    deleteInput: (id: number) => void;
    handleInputChange: (index: number, value: string) => void;
}
const SubInput = ({ value, id, deleteInput, handleInputChange }: Props) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        deleteInput(id)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(id, e.target.value)
    }

    return (
        <div>
            <div className='flex items-center gap-4'>
                <input placeholder={value}
                    value={value}
                    onChange={handleChange}
                    type="text"
                    id={id.toFixed()}
                    className='dark:bg-dark-grey font-normal text-[0.813rem] leading-[1.438rem] text-custom-black dark:text-white placeholder:text-opacity-25 border border-medium-grey border-opacity-25 outline-none hover:border-main-purple focus:border-main-purple transition duration-200 rounded-[4px] px-4 py-2 cursor-pointer basis-full' />
                <button type='button' onClick={handleClick}
                    className='cursor-pointer fill-medium-grey hover:fill-custom-red transition duration-200'>
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                        </g>
                    </svg>
                </button>

            </div>
        </div>
    )
}

export default SubInput