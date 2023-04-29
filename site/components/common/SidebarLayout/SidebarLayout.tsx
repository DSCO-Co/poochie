import { UserNav } from '@components/common';
import { ChevronLeft, Cross } from '@components/icons';
import { useUI } from '@components/ui/context';
import cn from 'clsx';
import { FC, ReactNode } from 'react';
import s from './SidebarLayout.module.css';

type SidebarLayoutProps = {
  className?: string;
  children?: ReactNode;
  handleClose?: () => void;
  handleBack?: () => void;
};

const SidebarLayout: FC<SidebarLayoutProps> = ({
  children,
  className,
  handleClose,
  handleBack,
}) => {
  const { sidebarView } = useUI();

  const renderBackButton = () => (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className="flex items-center transition duration-150 ease-in-out hover:text-accent-5 focus:outline-none"
    >
      <ChevronLeft className="w-6 h-6 hover:text-accent-3" />
      <span className="ml-2 text-xs text-accent-7">Back</span>
    </button>
  );

  const renderMobileNavbar = () => (
    <div className="bottom-0 left-0 w-full z-100 bg-primary">
      <div className="flex items-center justify-center h-24">
        <div className="flex items-center justify-center w-1/3 h-full border border-gray-300">
          <UserNav cart size={'large'} />
        </div>
        <div className="flex items-center justify-center w-1/3 h-full border-t border-b border-l-0 border-r-0 border-gray-300">
          <UserNav wishlist size={'large'} />
        </div>
        <div className="flex items-center justify-center w-1/3 h-full border border-gray-300">
          <UserNav userAvatar size={'large'} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        {handleBack && renderBackButton()}
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="flex items-center mr-6 transition duration-150 ease-in-out hover:text-accent-5 focus:outline-none"
          >
            <Cross className="w-6 h-6 hover:text-accent-3" />
            <span className="ml-2 text-sm text-accent-7 ">Close</span>
          </button>
        )}

        <UserNav mobileMenu />
      </header>
      <div className={s.container}>
        {sidebarView === 'MOBILE_MENU_VIEW' && renderMobileNavbar()}
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;