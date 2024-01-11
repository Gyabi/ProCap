import { RxHamburgerMenu } from 'react-icons/rx';
import { FaReact } from 'react-icons/fa';

// boolのstateと変更用関数を引数で受け取るためのpropを定義
type HeaderProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ isMenuOpen, setIsMenuOpen }: HeaderProps) => {
    return (
        <header className='h-8 w-full flex items-center justify-between px-4 py-2 bg-gray-400'>
            <button
                className='cursor-pointer'
                onClick={()=>{
                    setIsMenuOpen(!isMenuOpen);
                    console.log(isMenuOpen);
                }}
            >
                <RxHamburgerMenu size={24} />
            </button>

            <div className='flex items-center'>
                <FaReact size={24} />
                <h1 className='ml-2 text-xl'>Tauri GUI Template</h1>
            </div>
        
        </header>
    );
};