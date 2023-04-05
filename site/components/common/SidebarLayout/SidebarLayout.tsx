import React, { FC, ReactNode } from 'react'
import { Cross, ChevronLeft } from '@components/icons'
import { UserNav } from '@components/common'
import cn from 'clsx'
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
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none mr-6"
          >
            <Cross className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-accent-7 text-sm ">Close</span>
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-accent-7 text-xs">Back</span>
          </button>
        )}

        <UserNav mobileMenu={true} />
      </header>
      <div className={s.container}>{children}</div>
      <div className=" absolute bottom-0 left-0 w-full z-10">
        <div className="flex justify-center items-center h-24">
          <div className="w-1/3 border border-black flex justify-center items-center h-full">
            <UserNav cart={true} size={'large'} />
          </div>
          <div className="w-1/3 border-t border-b border-black flex justify-center items-center h-full border-l-0 border-r-0">
            <UserNav wishlist={true} size={'large'} />
          </div>
          <div className="w-1/3 border border-black flex justify-center items-center h-full">
            <UserNav userAvatar={true} size={'large'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarLayout
