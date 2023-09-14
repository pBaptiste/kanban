"use client"
import React, { useContext, useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { DataContext } from '@/context/data-provider'
import TaskList from './tasklist'
import EditBoardForm from './editboardform'

const Board = () => {
  const { boardList, activeBoard } = useContext(DataContext)
  const [isEditBoardFormOpen, setIsEditBoardFormOpen] = useState(false)

  //FETCH THE COLUMNS AND THE TASKS FOR THE ACTIVE BOARD
  // useEffect(() => {

  //   const fetchColumns = async (id: string) => {

  //     try {
  //       const response = await fetch(`${location.origin}/api/columns/${id}`, {
  //         method: 'GET',
  //       })

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       setColumns(data.columns)

  //     } catch (error) {
  //       console.error('Error fetching columns:', error);
  //     }
  //   }


  //   if (activeBoard) {
  //     const board = boardList.find(board => board.title === activeBoard)

  //     if (board) {
  //       fetchColumns(board.id)
  //     }
  //     else {
  //       console.log('No board found')
  //     }
  //   }

  //   // const fetchColumns = async () => {
  //   //   const response = await fetch(`${location.origin}/api/columns`, {
  //   //     method: 'DELETE',
  //   //     body: JSON.stringify({ activeBoard })
  //   //   })
  //   //   const data = await response.json()
  //   //   setColumns(data.columns)

  //   // }
  // }, [activeBoard, boardList])

  return (
    <section className="bg-light-grey dark:bg-very-dark-grey h-screen transition duration-500">
      {boardList.length === 0 ?
        (
          <div className="h-full flex flex-col items-center justify-center gap-10 md:gap-6 lg:gap-8">
            <h1 className="font-bold text-[1.125rem] leading-[1.438rem] text-center text-medium-grey max-w-[347px] md:max-w-[370px] lg:max-w-full">This board is empty. Create a new column to get started.</h1>
            <button className='bg-main-purple hover:bg-main-purple-hover px-[18px] py-[0.938rem] rounded-3xl text-white font-bold text-[0.938rem] leading-[1.188rem] transition duration-300'>
              + Add New Column
            </button>
          </div>
        )

        :

        (
          <div className="grid grid-flow-col gap-6 px-4 md:px-6 py-6 h-screen overflow-scroll scroll-smooth">
            {
              boardList.map(board => (
                board.name === activeBoard && (
                  board.columns.map(column => (
                    <TaskList key={column.id} name={column.name} tasks={column.tasks} columnId={column.id} />
                  ))
                )
              ))
            }
            <div className={`w-[280px] h-[85%] new-column-bg-dark dark:new-column-bg rounded-[6px] flex items-center justify-center`}>
              <button
                onClick={() => setIsEditBoardFormOpen(prev => true)}
                className="font-bold text-2xl leading-[1.875rem] text-medium-grey hover:text-main-purple">+ New Column</button>
            </div>
          </div>
        )
      }

      <AnimatePresence>
        {isEditBoardFormOpen && <EditBoardForm setIsEditBoardFormOpen={setIsEditBoardFormOpen} />}
      </AnimatePresence>

    </section>
  )
}

export default Board