"use client";
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { useState } from 'react'
import { Footer } from './components/Footer';

export const DefaultLayout = ({ children }:{children: React.ReactNode}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return(
        <div className='flex h-screen w-screen'>
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            <div className='flex flex-col flex-grow bg-gray-500'>
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                <main className='bg-gray-800 flex-grow'>{children}</main>
                <Footer/>
            </div>
        </div>
    )
}