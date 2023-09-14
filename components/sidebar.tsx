"use client"
import React, { useState } from 'react'
import SidebarMenu from './sidebar-menu'
import SidebarWidget from './sidebar-widget'

const Sidebar = () => {
    const [isSideBarMenuOpen, setIsSideBarMenuOpen] = useState(true)

    const openSideBarMenu = () => {
        setIsSideBarMenuOpen(true)
    }

    const closeSideBarMenu = () => {
        setIsSideBarMenuOpen(false)
    }

    return (
        <div className='h-full relative z-20'>
            {
                isSideBarMenuOpen
                    ?
                    <SidebarMenu closeSideBarMenu={closeSideBarMenu} />
                    :
                    <SidebarWidget openSideBarMenu={openSideBarMenu} />
            }
        </div>
    )
}

export default Sidebar