import type { Category } from '@commerce/types/site'
import { FreeShippingBanner, Searchbar, UserNav } from '@components/common'
import { Container, Logo } from '@components/ui'
import Link from 'next/link'
import { FC, useState } from 'react'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'

interface Link {
  href: string
  label: string
  subLinks?: any[] | Category[] | undefined
}

interface NavbarProps {
  links?: Link[]
}

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function DropDownMenu({ children, dropDownLinks, isActive, menuKey, setActiveMenu }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMouseEnter = (event) => {
    event.target.style.transform = 'translateX(10px)'
  }

  const handleMouseLeave = (event) => {
    event.target.style.transform = 'translateX(0)'
  }

  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
      onMouseEnter={() => {
        setIsMenuOpen(true)
        setActiveMenu(menuKey)
      }}
      onMouseLeave={() => {
        setIsMenuOpen(false)
        setActiveMenu(null)
      }}
    >
      <div>
        <Menu.Button
          className={classNames(
            'flex flex-col justify-center items-center',
            isActive ? 'text-gray-900 underline' : 'hover:text-gray-600'
          )}
        >
          {children}
        </Menu.Button>
      </div>

      <Transition
        show={isMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {dropDownLinks.map((dropDownLink) => (
              <Menu.Item key={dropDownLink.name}>
                {({ active }) => (
                  <div className="relative">
                    <a
                      href={dropDownLink.path}
                      className={classNames(
                        active ? 'text-gray-900' : 'text-gray-900',
                        'block px-4 py-2 text-sm transition-transform duration-200 transform origin-left'
                      )}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {dropDownLink.name}
                    </a>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)

  return (
    <NavbarRoot>
      {/* Free shipping banner */}
      <FreeShippingBanner />
      {/* Main Navbar piece */}
      <Container clean className="px-6 mx-auto max-w-8xl">
        <div className={s.nav}>
          {/* Logo */}
          <div className="flex items-center flex-1">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
          </div>
          {/* Row of links */}
          <nav className={s.navMenu}>
            <Link href="/search" className={s.link}>
              All
            </Link>
            {links?.map((l) => (
              <DropDownMenu
                dropDownLinks={l.subLinks}
                key={l.href}
                menuKey={l.href}
                isActive={activeMenu === l.href}
                setActiveMenu={setActiveMenu}
              >
                <Link href={l.href} className={`${s.link} ${activeMenu === l.href ? s.linkActive : ''}`}>
                  {l.label}
                </Link>

              </DropDownMenu>
            ))}
          </nav>
          <div className="flex items-center justify-end flex-1 flex-shrink-[2] space-x-8">
            {/* {process.env.COMMERCE_SEARCH_ENABLED && (
              <div className="flex items-center justify-center">
                <button
                  onClick={() =>
                    setShowSearchBar((prevShowSearchBar) => !prevShowSearchBar)
                  }
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </button>
              </div>
            )} */}
            <UserNav cart={true} wishlist={true} userAvatar={true} mobileMenu={true} />
          </div>
        </div>
        {/* Desktop search bar */}
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="flex justify-center">
            <div className="justify-center w-[320px] hidden lg:flex">
              {showSearchBar && <Searchbar />}
            </div>
          </div>
        )}
        {/* Mobile search bar */}
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="flex pb-4 lg:px-6 lg:hidden">
            {showSearchBar && <Searchbar id="mobile-search" />}
          </div>
        )}
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
