import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons/lib';

type NavigationItemProps = {
  Icon: IconType;
  href: string;
  name: string;
};

export const NavigationItem = ({ Icon, href, name }: NavigationItemProps) => {
  const pathname = usePathname();
  return (
    <>
      <Link
        href={href}
        className={`${
          pathname == href
            ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
            : ''
        } w-44 rounded-lg flex items-center p-2 text-14 text-white duration-200 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/50`}
      >
        <Icon color={'white'} size={24} />
        <p className={'ml-5 text-10 font-bold'}>{name}</p>
      </Link>
    </>
  );
};