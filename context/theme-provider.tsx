"use client"
import React, { useState, useEffect, createContext, ReactNode } from 'react'

interface ThemeContextProps {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
    isDarkMode: false,
    setIsDarkMode: () => { },
})

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    // Read the initial theme choice from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark');
    }, []);

    // Update localStorage when the theme changes
    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <div className={`${isDarkMode && 'dark'} `}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider