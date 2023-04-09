import { UserNav } from '@components/common'
import { ChevronLeft } from '@components/icons'
import { useUI } from '@components/ui/context'
import cn from 'clsx'
import { FC, ReactNode } from 'react'
import s from './SidebarLayout.module.css'

type ComponentProps = { className?: string; children?: ReactNode } & (
  | { handleClose: () => any; handleBack?: never }
  | { handleBack: () => any; handleClose?: never }
)

const SidebarLayout: FC<ComponentProps> = ({
  children,
  className,
  handleBack,
  handleClose,
}) => {
  const { sidebarView } = useUI()
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        {/* Temporary Hack to fix layout */}
        <div className="flex items-center mr-6" />

        {/* {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="flex items-center mr-6 transition duration-150 ease-in-out hover:text-accent-5 focus:outline-none"
          >
            <Cross className="w-6 h-6 hover:text-accent-3" />
            <span className="ml-2 text-sm text-accent-7 ">Close</span>
          </button>
        )} */}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="flex items-center transition duration-150 ease-in-out hover:text-accent-5 focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6 hover:text-accent-3" />
            <span className="ml-2 text-xs text-accent-7">Back</span>
          </button>
        )}

        <UserNav mobileMenu={true} />
      </header>
      <div className={s.container}>
        {sidebarView === 'MOBILE_MENU_VIEW' && (
          // create the mobile navbar
          <div className="bottom-0 left-0 w-full z-100 bg-primary">
            <div className="flex items-center justify-center h-24">
              <div className="flex items-center justify-center w-1/3 h-full border border-gray-300">
                <UserNav cart={true} size={'large'} />
              </div>
              <div className="flex items-center justify-center w-1/3 h-full border-t border-b border-l-0 border-r-0 border-gray-300">
                <UserNav wishlist={true} size={'large'} />
              </div>
              <div className="flex items-center justify-center w-1/3 h-full border border-gray-300">
                <UserNav userAvatar={true} size={'large'} />
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default SidebarLayout
