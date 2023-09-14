"use client"
import React, { useState, useEffect, createContext, ReactNode } from 'react'
import { Board } from '@/types/types'

interface DataContextProps {
    activeBoard: string;
    activeBoardId: string;
    activeColumn: string;
    boardList: Board[];
    setBoardList: React.Dispatch<React.SetStateAction<Board[]>>;
    setActiveBoard: React.Dispatch<React.SetStateAction<string>>;
    setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
    setActiveColumn: React.Dispatch<React.SetStateAction<string>>;
}

export const DataContext = createContext<DataContextProps>({
    activeBoard: '',
    activeBoardId: '',
    activeColumn: '',
    setActiveBoard: () => { },
    setActiveBoardId: () => { },
    setActiveColumn: () => { },
    boardList: [],
    setBoardList: () => { },
})

interface DataProviderProps {
    children: ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {
    const [boardList, setBoardList] = useState<Board[]>([])
    const [activeBoard, setActiveBoard] = useState('')
    const [activeBoardId, setActiveBoardId] = useState('')
    const [activeColumn, setActiveColumn] = useState('')

    useEffect(() => {
        // Function to recursively add unique identifiers to an object and its nested arrays
        function addUniqueIds(obj: any): any {
            if (typeof obj !== "object" || obj === null) {
                return obj; // Base case: return non-object values as-is
            }

            if (Array.isArray(obj)) {
                // If it's an array, recursively process each element
                return obj.map(addUniqueIds);
            }

            // If it's an object, add a unique id and process its properties
            obj.id = self.crypto.randomUUID();
            for (const key in obj) {
                obj[key] = addUniqueIds(obj[key]);
            }

            return obj;
        }

        const fetchBoards = async () => {
            try {
                const response = await fetch(`/data.json`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                const updatedBoards = data.boards.map(addUniqueIds);

                setBoardList(updatedBoards); // Update the state with fetched data

                setActiveBoard(updatedBoards[0].name || '');

                setActiveBoardId(updatedBoards[0].id || '')


            } catch (error) {
                console.error('Error fetching boards:', error);
            }
        };

        fetchBoards();
    }, []);

    return (
        <DataContext.Provider value={{ activeBoard, setActiveBoard, activeBoardId, setActiveBoardId, activeColumn, setActiveColumn, boardList, setBoardList }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider