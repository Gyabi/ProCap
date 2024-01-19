import { IconType } from 'react-icons/lib';
import { GiCaptainHatProfile } from "react-icons/gi";
import { HiOutlineUserGroup } from 'react-icons/hi';
import { CiSettings } from "react-icons/ci";

type Window = {
    name: string;
    href: string;
    icon: IconType;
}

export const windows: Window[] = [
    {
        name: 'Projects',
        href: '/',
        icon: GiCaptainHatProfile
    },
    // {
    //     name: 'Sample1',
    //     href: '/sample1',
    //     icon: HiOutlineUserGroup
    // }
]

export const specialWindows: Window[] = [
    // {
    //     name: 'Setting',
    //     href: '/setting',
    //     icon: CiSettings
    // }
]