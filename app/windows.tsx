import { IconType } from 'react-icons/lib';
import { AiFillDashboard } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { CiSettings } from "react-icons/ci";

type Window = {
    name: string;
    href: string;
    icon: IconType;
}

export const windows: Window[] = [
    {
        name: 'Home',
        href: '/',
        icon: AiFillDashboard
    },
    {
        name: 'Sample1',
        href: '/sample1',
        icon: HiOutlineUserGroup
    }
]

export const specialWindows: Window[] = [
    {
        name: 'Setting',
        href: '/setting',
        icon: CiSettings
    }
]