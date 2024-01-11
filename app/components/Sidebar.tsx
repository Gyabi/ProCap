"use client";
import { NavigationItem } from './NavigationItem';
import { windows, specialWindows } from '../windows';

type SidebarProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ isMenuOpen, setIsMenuOpen }:SidebarProps) => {
  return (
    <>
      <nav
        className={`${
          isMenuOpen ? '' : 'fixed right-[-100%]'
        } h-full w-100 bg-gray-900 p-5 duration-300 flex flex-col space-y-2 justify-between items-center`}
      >
        <div className='flex flex-col space-y-2'>
            {windows.map((window) => (
                <NavigationItem
                Icon={window.icon}
                href={window.href}
                name={window.name}
                key={window.name}
                />
            ))}
        </div>
        <div className='flex flex-col space-y-2'>
            {specialWindows.map((window) => (
                <NavigationItem
                Icon={window.icon}
                href={window.href}
                name={window.name}
                key={window.name}
                />
            ))}
        </div>
      </nav>
    </>
  );
};